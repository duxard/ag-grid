var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { _, ChartType } from "@ag-grid-community/core";
import { AgChart } from "ag-charts-community";
import { CartesianChartProxy } from "./cartesianChartProxy";
var BarChartProxy = /** @class */ (function (_super) {
    __extends(BarChartProxy, _super);
    function BarChartProxy(params) {
        var _this = _super.call(this, params) || this;
        _this.initChartOptions();
        _this.recreateChart();
        return _this;
    }
    BarChartProxy.prototype.getDefaultOptionsFromTheme = function (theme) {
        var options = _super.prototype.getDefaultOptionsFromTheme.call(this, theme);
        var integratedChartType = this.chartType;
        var standaloneChartType = this.getStandaloneChartType();
        var seriesType = integratedChartType === ChartType.GroupedBar
            || integratedChartType === ChartType.StackedBar
            || integratedChartType === ChartType.NormalizedBar ? 'bar' : 'column';
        var seriesDefaults = theme.getConfig(standaloneChartType + '.series.' + seriesType);
        options.seriesDefaults = {
            shadow: seriesDefaults.shadow,
            label: seriesDefaults.label,
            tooltip: {
                enabled: seriesDefaults.tooltip && seriesDefaults.tooltip.enabled,
                renderer: seriesDefaults.tooltip && seriesDefaults.tooltip.renderer
            },
            fill: {
                colors: seriesDefaults.fills || theme.palette.fills,
                opacity: seriesDefaults.fillOpacity
            },
            stroke: {
                colors: seriesDefaults.strokes || theme.palette.strokes,
                opacity: seriesDefaults.strokeOpacity,
                width: seriesDefaults.strokeWidth
            },
            lineDash: seriesDefaults.lineDash ? seriesDefaults.lineDash : [0],
            lineDashOffset: seriesDefaults.lineDashOffset,
            highlightStyle: seriesDefaults.highlightStyle,
            listeners: seriesDefaults.listeners
        };
        return options;
    };
    BarChartProxy.prototype.createChart = function (options) {
        var _a = this.chartProxyParams, grouping = _a.grouping, parentElement = _a.parentElement;
        var isColumn = this.isColumnChart();
        options = options || this.chartOptions;
        var seriesDefaults = options.seriesDefaults;
        var agChartOptions = options;
        if (grouping) {
            agChartOptions.type = 'groupedCategory';
        }
        agChartOptions.autoSize = true;
        agChartOptions.axes = [__assign(__assign({}, (isColumn ? options.xAxis : options.yAxis)), { position: isColumn ? 'bottom' : 'left', type: grouping ? 'groupedCategory' : 'category' }), __assign(__assign({}, (isColumn ? options.yAxis : options.xAxis)), { position: isColumn ? 'left' : 'bottom', type: 'number' })];
        agChartOptions.series = [__assign(__assign({}, this.getSeriesDefaults()), { fills: seriesDefaults.fill.colors, fillOpacity: seriesDefaults.fill.opacity, strokes: seriesDefaults.stroke.colors, strokeOpacity: seriesDefaults.stroke.opacity, strokeWidth: seriesDefaults.stroke.width, tooltip: {
                    enabled: seriesDefaults.tooltip && seriesDefaults.tooltip.enabled,
                    renderer: seriesDefaults.tooltip && seriesDefaults.tooltip.enabled && seriesDefaults.tooltip.renderer,
                } })];
        agChartOptions.container = parentElement;
        return AgChart.create(agChartOptions);
    };
    BarChartProxy.prototype.update = function (params) {
        var _this = this;
        this.chartProxyParams.grouping = params.grouping;
        this.updateAxes('category', !this.isColumnChart());
        var chart = this.chart;
        var barSeries = chart.series[0];
        var palette = this.getPalette();
        var fields = params.fields;
        if (this.crossFiltering) {
            // add additional filtered out field
            fields.forEach(function (field) {
                var crossFilteringField = __assign({}, field);
                crossFilteringField.colId = field.colId + '-filtered-out';
                fields.push(crossFilteringField);
            });
            // introduce cross filtering transparent fills
            var fills_1 = [];
            palette.fills.forEach(function (fill) {
                fills_1.push(fill);
                fills_1.push(_this.hexToRGBA(fill, '0.3'));
            });
            barSeries.fills = fills_1;
            // introduce cross filtering transparent strokes
            var strokes = [];
            palette.strokes.forEach(function (stroke) {
                fills_1.push(stroke);
                fills_1.push(_this.hexToRGBA(stroke, '0.3'));
            });
            barSeries.strokes = strokes;
            // disable series highlighting by default
            barSeries.highlightStyle.fill = undefined;
            // hide 'filtered out' legend items
            var colIds = params.fields.map(function (f) { return f.colId; });
            barSeries.hideInLegend = colIds.filter(function (colId) { return colId.includes('-filtered-out'); });
            // sync toggling of legend item with hidden 'filtered out' item
            chart.legend.addEventListener('click', function (event) {
                barSeries.toggleSeriesItem(event.itemId + '-filtered-out', event.enabled);
            });
            chart.tooltip.delay = 500;
            // add node click cross filtering callback to series
            barSeries.addEventListener('nodeClick', this.crossFilterCallback);
        }
        else {
            barSeries.fills = palette.fills;
            barSeries.strokes = palette.strokes;
        }
        barSeries.data = this.transformData(params.data, params.category.id);
        barSeries.xKey = params.category.id;
        barSeries.xName = params.category.name;
        barSeries.yKeys = params.fields.map(function (f) { return f.colId; });
        barSeries.yNames = params.fields.map(function (f) { return f.displayName; });
        this.updateLabelRotation(params.category.id, !this.isColumnChart());
    };
    BarChartProxy.prototype.getDefaultOptions = function () {
        var fontOptions = this.getDefaultFontOptions();
        var options = this.getDefaultCartesianChartOptions();
        options.seriesDefaults = __assign(__assign({}, options.seriesDefaults), { tooltip: {
                enabled: true,
            }, label: __assign(__assign({}, fontOptions), { enabled: false }), shadow: this.getDefaultDropShadowOptions() });
        return options;
    };
    BarChartProxy.prototype.isColumnChart = function () {
        return _.includes([ChartType.Column, ChartType.GroupedColumn, ChartType.StackedColumn, ChartType.NormalizedColumn], this.chartType);
    };
    BarChartProxy.prototype.getSeriesDefaults = function () {
        var chartType = this.chartType;
        var isColumn = this.isColumnChart();
        var isGrouped = !this.crossFiltering && (chartType === ChartType.GroupedColumn || chartType === ChartType.GroupedBar);
        var isNormalized = !this.crossFiltering && (chartType === ChartType.NormalizedColumn || chartType === ChartType.NormalizedBar);
        return __assign(__assign({}, this.chartOptions.seriesDefaults), { type: isColumn ? 'column' : 'bar', grouped: isGrouped, normalizedTo: isNormalized ? 100 : undefined });
    };
    return BarChartProxy;
}(CartesianChartProxy));
export { BarChartProxy };
