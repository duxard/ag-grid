"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var EXPAND_STATE;
(function (EXPAND_STATE) {
    EXPAND_STATE[EXPAND_STATE["EXPANDED"] = 0] = "EXPANDED";
    EXPAND_STATE[EXPAND_STATE["COLLAPSED"] = 1] = "COLLAPSED";
    EXPAND_STATE[EXPAND_STATE["INDETERMINATE"] = 2] = "INDETERMINATE";
})(EXPAND_STATE = exports.EXPAND_STATE || (exports.EXPAND_STATE = {}));
var PrimaryColsHeaderPanel = /** @class */ (function (_super) {
    __extends(PrimaryColsHeaderPanel, _super);
    function PrimaryColsHeaderPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimaryColsHeaderPanel.prototype.preConstruct = function () {
        this.setTemplate("<div class=\"ag-column-select-header\" role=\"presentation\">\n                <div ref=\"eExpand\" class=\"ag-column-select-header-icon\"></div>\n                <ag-checkbox ref=\"eSelect\" class=\"ag-column-select-header-checkbox\"></ag-checkbox>\n                <ag-input-text-field class=\"ag-column-select-header-filter-wrapper\" ref=\"eFilterTextField\"></ag-input-text-field>\n            </div>");
    };
    PrimaryColsHeaderPanel.prototype.postConstruct = function () {
        var _this = this;
        this.createExpandIcons();
        this.addDestroyableEventListener(this.eExpand, "click", this.onExpandClicked.bind(this));
        this.addDestroyableEventListener(this.eSelect.getInputElement(), 'click', this.onSelectClicked.bind(this));
        this.eFilterTextField.onValueChange(function () { return _this.onFilterTextChanged(); });
        this.addDestroyableEventListener(this.eFilterTextField.getInputElement(), "keypress", this.onMiniFilterKeyPress.bind(this));
        this.addDestroyableEventListener(this.eventService, core_1.Events.EVENT_NEW_COLUMNS_LOADED, this.showOrHideOptions.bind(this));
    };
    PrimaryColsHeaderPanel.prototype.init = function (params) {
        this.params = params;
        if (this.columnController.isReady()) {
            this.showOrHideOptions();
        }
    };
    PrimaryColsHeaderPanel.prototype.createExpandIcons = function () {
        this.eExpand.appendChild((this.eExpandChecked = core_1._.createIconNoSpan("columnSelectOpen", this.gridOptionsWrapper)));
        this.eExpand.appendChild((this.eExpandUnchecked = core_1._.createIconNoSpan("columnSelectClosed", this.gridOptionsWrapper)));
        this.eExpand.appendChild((this.eExpandIndeterminate = core_1._.createIconNoSpan("columnSelectIndeterminate", this.gridOptionsWrapper)));
        this.setExpandState(EXPAND_STATE.EXPANDED);
    };
    // we only show expand / collapse if we are showing columns
    PrimaryColsHeaderPanel.prototype.showOrHideOptions = function () {
        var showFilter = !this.params.suppressColumnFilter;
        var showSelect = !this.params.suppressColumnSelectAll;
        var showExpand = !this.params.suppressColumnExpandAll;
        var groupsPresent = this.columnController.isPrimaryColumnGroupsPresent();
        var translate = this.gridOptionsWrapper.getLocaleTextFunc();
        this.eFilterTextField.setInputPlaceholder(translate('searchOoo', 'Search...'));
        core_1._.setDisplayed(this.eFilterTextField.getGui(), showFilter);
        core_1._.setDisplayed(this.eSelect.getGui(), showSelect);
        core_1._.setDisplayed(this.eExpand, showExpand && groupsPresent);
    };
    PrimaryColsHeaderPanel.prototype.onFilterTextChanged = function () {
        var _this = this;
        if (!this.onFilterTextChangedDebounced) {
            this.onFilterTextChangedDebounced = core_1._.debounce(function () {
                var filterText = _this.eFilterTextField.getValue();
                _this.dispatchEvent({ type: "filterChanged", filterText: filterText });
            }, 300);
        }
        this.onFilterTextChangedDebounced();
    };
    PrimaryColsHeaderPanel.prototype.onMiniFilterKeyPress = function (e) {
        if (core_1._.isKeyPressed(e, core_1.Constants.KEY_ENTER)) {
            this.onSelectClicked();
        }
    };
    PrimaryColsHeaderPanel.prototype.onSelectClicked = function () {
        var eventType = this.selectState === true ? "unselectAll" : "selectAll";
        this.dispatchEvent({ type: eventType });
    };
    PrimaryColsHeaderPanel.prototype.onExpandClicked = function () {
        var eventType = this.expandState === EXPAND_STATE.EXPANDED ? "collapseAll" : "expandAll";
        this.dispatchEvent({ type: eventType });
    };
    PrimaryColsHeaderPanel.prototype.setExpandState = function (state) {
        this.expandState = state;
        core_1._.setDisplayed(this.eExpandChecked, this.expandState === EXPAND_STATE.EXPANDED);
        core_1._.setDisplayed(this.eExpandUnchecked, this.expandState === EXPAND_STATE.COLLAPSED);
        core_1._.setDisplayed(this.eExpandIndeterminate, this.expandState === EXPAND_STATE.INDETERMINATE);
    };
    PrimaryColsHeaderPanel.prototype.setSelectionState = function (state) {
        this.selectState = state;
        this.eSelect.setValue(this.selectState);
    };
    __decorate([
        core_1.Autowired('gridOptionsWrapper')
    ], PrimaryColsHeaderPanel.prototype, "gridOptionsWrapper", void 0);
    __decorate([
        core_1.Autowired('columnController')
    ], PrimaryColsHeaderPanel.prototype, "columnController", void 0);
    __decorate([
        core_1.Autowired('eventService')
    ], PrimaryColsHeaderPanel.prototype, "eventService", void 0);
    __decorate([
        core_1.RefSelector('eExpand')
    ], PrimaryColsHeaderPanel.prototype, "eExpand", void 0);
    __decorate([
        core_1.RefSelector('eSelect')
    ], PrimaryColsHeaderPanel.prototype, "eSelect", void 0);
    __decorate([
        core_1.RefSelector('eFilterTextField')
    ], PrimaryColsHeaderPanel.prototype, "eFilterTextField", void 0);
    __decorate([
        core_1.PreConstruct
    ], PrimaryColsHeaderPanel.prototype, "preConstruct", null);
    __decorate([
        core_1.PostConstruct
    ], PrimaryColsHeaderPanel.prototype, "postConstruct", null);
    return PrimaryColsHeaderPanel;
}(core_1.Component));
exports.PrimaryColsHeaderPanel = PrimaryColsHeaderPanel;
//# sourceMappingURL=primaryColsHeaderPanel.js.map