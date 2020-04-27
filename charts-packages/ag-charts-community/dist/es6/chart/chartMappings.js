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
var _a, _b, _c, _d;
import { Padding } from "../util/padding";
import { CartesianChart } from "./cartesianChart";
import { NumberAxis } from "./axis/numberAxis";
import { CategoryAxis } from "./axis/categoryAxis";
import { LineSeries } from "./series/cartesian/lineSeries";
import { BarSeries } from "./series/cartesian/barSeries";
import { HistogramSeries } from "./series/cartesian/histogramSeries";
import { ScatterSeries } from "./series/cartesian/scatterSeries";
import { AreaSeries } from "./series/cartesian/areaSeries";
import { PolarChart } from "./polarChart";
import { PieSeries } from "./series/polar/pieSeries";
import { AxisLabel, AxisTick } from "../axis";
import { TimeAxis } from "./axis/timeAxis";
import { Caption } from "../caption";
import { DropShadow } from "../scene/dropShadow";
import { Legend, LegendPosition } from "./legend";
import palette from "./palettes";
/*
    This file defines the specs for creating different kinds of charts, but
    contains no code that uses the specs to actually create charts
*/
var commonChartMappings = {
    background: {
        meta: {
            defaults: {
                visible: true,
                fill: 'white'
            }
        }
    },
    padding: {
        meta: {
            constructor: Padding,
            defaults: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        }
    },
    title: {
        meta: {
            constructor: Caption,
            defaults: {
                enabled: true,
                padding: new Padding(10),
                text: 'Title',
                fontStyle: undefined,
                fontWeight: 'bold',
                fontSize: 14,
                fontFamily: 'Verdana, sans-serif',
                color: 'rgba(70, 70, 70, 1)'
            }
        }
    },
    subtitle: {
        meta: {
            constructor: Caption,
            defaults: {
                enabled: true,
                padding: new Padding(10),
                text: 'Subtitle',
                fontStyle: undefined,
                fontWeight: undefined,
                fontSize: 12,
                fontFamily: 'Verdana, sans-serif',
                color: 'rgba(140, 140, 140, 1)'
            }
        }
    },
    legend: {
        meta: {
            constructor: Legend,
            defaults: {
                enabled: true,
                position: LegendPosition.Right,
                spacing: 20,
                layoutHorizontalSpacing: 16,
                layoutVerticalSpacing: 8,
                itemSpacing: 8,
                markerShape: undefined,
                markerSize: 15,
                strokeWidth: 1,
                color: 'black',
                fontStyle: undefined,
                fontWeight: undefined,
                fontSize: 12,
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }
};
var chartDefaults = {
    container: undefined,
    data: [],
    padding: new Padding(20),
    title: undefined,
    subtitle: undefined,
};
var chartMeta = {
    // Charts components' constructors normally don't take any parameters (which makes things consistent -- everything
    // is configured the same way, via the properties, and makes the factory pattern work well) but the charts
    // themselves are the exceptions.
    // If a chart config has the (optional) `document` property, it will be passed to the constructor.
    // There is no actual `document` property on the chart, it can only be supplied during instantiation.
    constructorParams: ['document'],
    setAsIs: ['container', 'data', 'tooltipOffset'],
};
var axisDefaults = {
    defaults: {
        gridStyle: [{
                stroke: 'rgba(219, 219, 219, 1)',
                lineDash: [4, 2]
            }]
    }
};
var seriesDefaults = {
    visible: true,
    showInLegend: true
};
var columnSeriesDefaults = {
    fills: palette.fills,
    strokes: palette.strokes,
    fillOpacity: 1,
    strokeOpacity: 1,
    xKey: '',
    xName: '',
    yKeys: [],
    yNames: [],
    grouped: false,
    normalizedTo: undefined,
    strokeWidth: 1,
    shadow: undefined,
    highlightStyle: {
        fill: 'yellow'
    }
};
var shadowMapping = {
    shadow: {
        meta: {
            constructor: DropShadow,
            defaults: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.5)',
                xOffset: 0,
                yOffset: 0,
                blur: 5
            }
        }
    }
};
var labelDefaults = {
    enabled: true,
    fontStyle: undefined,
    fontWeight: undefined,
    fontSize: 12,
    fontFamily: 'Verdana, sans-serif',
    color: 'rgba(70, 70, 70, 1)'
};
var labelMapping = {
    label: {
        meta: {
            defaults: __assign({}, labelDefaults)
        }
    }
};
var axisMappings = {
    line: {
        meta: {
            defaults: {
                width: 1,
                color: 'rgba(195, 195, 195, 1)'
            }
        }
    },
    title: {
        meta: {
            constructor: Caption,
            defaults: {
                enabled: true,
                padding: new Padding(10),
                text: 'Axis Title',
                fontStyle: undefined,
                fontWeight: 'bold',
                fontSize: 12,
                fontFamily: 'Verdana, sans-serif',
                color: 'rgba(70, 70, 70, 1)'
            }
        }
    },
    label: {
        meta: {
            constructor: AxisLabel,
            defaults: {
                fontStyle: undefined,
                fontWeight: undefined,
                fontSize: 12,
                fontFamily: 'Verdana, sans-serif',
                padding: 5,
                color: 'rgba(87, 87, 87, 1)',
                formatter: undefined
            }
        }
    },
    tick: {
        meta: {
            constructor: AxisTick,
            defaults: {
                width: 1,
                size: 6,
                color: 'rgba(195, 195, 195, 1)',
                count: 10
            }
        }
    }
};
var mappings = (_a = {},
    _a[CartesianChart.type] = __assign(__assign({ meta: __assign(__assign({ constructor: CartesianChart }, chartMeta), { defaults: __assign(__assign({}, chartDefaults), { axes: [{
                        type: CategoryAxis.type,
                        position: 'bottom'
                    }, {
                        type: NumberAxis.type,
                        position: 'left'
                    }] }) }) }, commonChartMappings), { axes: (_b = {},
            _b[NumberAxis.type] = __assign({ meta: __assign({ constructor: NumberAxis, setAsIs: ['gridStyle'] }, axisDefaults) }, axisMappings),
            _b[CategoryAxis.type] = __assign({ meta: __assign({ constructor: CategoryAxis, setAsIs: ['gridStyle'] }, axisDefaults) }, axisMappings),
            _b[TimeAxis.type] = __assign({ meta: __assign({ constructor: TimeAxis, setAsIs: ['gridStyle'] }, axisDefaults) }, axisMappings),
            _b), series: (_c = {},
            _c[LineSeries.type] = {
                meta: {
                    constructor: LineSeries,
                    defaults: {
                        title: undefined,
                        xKey: '',
                        xName: '',
                        yKey: '',
                        yName: '',
                        stroke: palette.fills[0],
                        strokeWidth: 2,
                        fillOpacity: 1,
                        strokeOpacity: 1,
                        highlightStyle: {
                            fill: 'yellow'
                        }
                    }
                },
                highlightStyle: {},
                marker: {}
            },
            _c.column = __assign(__assign({ meta: {
                    constructor: BarSeries,
                    defaults: __assign(__assign({ flipXY: false }, seriesDefaults), columnSeriesDefaults)
                }, highlightStyle: {} }, labelMapping), shadowMapping),
            _c.bar = __assign(__assign({ meta: {
                    constructor: BarSeries,
                    defaults: __assign(__assign({ flipXY: true }, seriesDefaults), columnSeriesDefaults)
                }, highlightStyle: {} }, labelMapping), shadowMapping),
            _c[ScatterSeries.type] = {
                meta: {
                    constructor: ScatterSeries,
                    defaults: __assign(__assign({}, seriesDefaults), { title: undefined, xKey: '', yKey: '', sizeKey: undefined, labelKey: undefined, xName: '', yName: '', sizeName: 'Size', labelName: 'Label', fill: palette.fills[0], stroke: palette.strokes[0], strokeWidth: 2, fillOpacity: 1, strokeOpacity: 1, tooltipRenderer: undefined, highlightStyle: {
                            fill: 'yellow'
                        } })
                },
                highlightStyle: {},
                marker: {}
            },
            _c[AreaSeries.type] = __assign({ meta: {
                    constructor: AreaSeries,
                    defaults: __assign(__assign({}, seriesDefaults), { xKey: '', xName: '', yKeys: [], yNames: [], normalizedTo: undefined, fills: palette.fills, strokes: palette.strokes, fillOpacity: 1, strokeOpacity: 1, strokeWidth: 2, shadow: undefined, highlightStyle: {
                            fill: 'yellow'
                        } })
                }, highlightStyle: {}, marker: {} }, shadowMapping),
            _c[HistogramSeries.type] = {
                meta: {
                    constructor: HistogramSeries,
                    defaults: __assign(__assign({}, seriesDefaults), { title: undefined, xKey: '', yKey: '', xName: '', yName: '', fill: palette.fills[0], stroke: palette.strokes[0], strokeWidth: 1, fillOpacity: 1, strokeOpacity: 1, aggregation: 'sum', tooltipRenderer: undefined, highlightStyle: {
                            fill: 'yellow'
                        } })
                },
                highlightStyle: {}
            },
            _c) }),
    _a[PolarChart.type] = __assign(__assign({ meta: __assign(__assign({ constructor: PolarChart }, chartMeta), { defaults: __assign(__assign({}, chartDefaults), { padding: new Padding(40) }) }) }, commonChartMappings), { series: (_d = {},
            _d[PieSeries.type] = __assign({ meta: {
                    constructor: PieSeries,
                    defaults: __assign(__assign({}, seriesDefaults), { title: undefined, calloutColors: palette.strokes, calloutStrokeWidth: 1, calloutLength: 10, angleKey: '', angleName: '', radiusKey: undefined, radiusName: undefined, labelKey: undefined, labelName: undefined, fills: palette.fills, strokes: palette.strokes, fillOpacity: 1, strokeOpacity: 1, rotation: 0, outerRadiusOffset: 0, innerRadiusOffset: 0, strokeWidth: 1, shadow: undefined })
                }, highlightStyle: {}, title: {
                    meta: {
                        constructor: Caption,
                        defaults: {
                            enabled: true,
                            padding: new Padding(10),
                            text: 'Series Title',
                            fontStyle: undefined,
                            fontWeight: 'bold',
                            fontSize: 14,
                            fontFamily: 'Verdana, sans-serif',
                            color: 'black'
                        }
                    }
                }, label: {
                    meta: {
                        defaults: __assign(__assign({}, labelDefaults), { offset: 3, minAngle: 20 })
                    }
                }, callout: {
                    meta: {
                        defaults: {
                            colors: palette.strokes,
                            length: 10,
                            strokeWidth: 1
                        }
                    }
                } }, shadowMapping),
            _d) }),
    _a);
// Amend the `mappings` object with aliases for different chart types.
{
    var typeToAliases = {
        cartesian: ['line', 'area', 'bar', 'column'],
        polar: ['pie']
    };
    var _loop_1 = function (type) {
        typeToAliases[type].forEach(function (alias) {
            mappings[alias] = mappings[type];
        });
    };
    for (var type in typeToAliases) {
        _loop_1(type);
    }
}
// Special handling for scatter and histogram charts, for which both axes should default to type `number`.
mappings['scatter'] =
    mappings['histogram'] = __assign(__assign({}, mappings.cartesian), { meta: __assign(__assign({}, mappings.cartesian.meta), { defaults: __assign(__assign({}, chartDefaults), { axes: [{
                        type: 'number',
                        position: 'bottom'
                    }, {
                        type: 'number',
                        position: 'left'
                    }] }) }) });
export default mappings;
