/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v25.0.1
 * @link http://www.ag-grid.com/
 * @license MIT
 */
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
import { Bean, Autowired } from "../context/context";
import { BeanStub } from "../context/beanStub";
import { Events } from "../events";
var ScrollVisibleService = /** @class */ (function (_super) {
    __extends(ScrollVisibleService, _super);
    function ScrollVisibleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollVisibleService.prototype.setScrollsVisible = function (params) {
        var atLeastOneDifferent = this.horizontalScrollShowing !== params.horizontalScrollShowing ||
            this.verticalScrollShowing !== params.verticalScrollShowing;
        if (atLeastOneDifferent) {
            this.horizontalScrollShowing = params.horizontalScrollShowing;
            this.verticalScrollShowing = params.verticalScrollShowing;
            var event_1 = {
                type: Events.EVENT_SCROLL_VISIBILITY_CHANGED,
                api: this.gridApi,
                columnApi: this.columnApi
            };
            this.eventService.dispatchEvent(event_1);
        }
    };
    // used by pagination service - to know page height
    ScrollVisibleService.prototype.isHorizontalScrollShowing = function () {
        return this.horizontalScrollShowing;
    };
    // used by header container
    ScrollVisibleService.prototype.isVerticalScrollShowing = function () {
        return this.verticalScrollShowing;
    };
    __decorate([
        Autowired('columnController')
    ], ScrollVisibleService.prototype, "columnController", void 0);
    __decorate([
        Autowired('columnApi')
    ], ScrollVisibleService.prototype, "columnApi", void 0);
    __decorate([
        Autowired('gridApi')
    ], ScrollVisibleService.prototype, "gridApi", void 0);
    __decorate([
        Autowired('gridOptionsWrapper')
    ], ScrollVisibleService.prototype, "gridOptionsWrapper", void 0);
    ScrollVisibleService = __decorate([
        Bean('scrollVisibleService')
    ], ScrollVisibleService);
    return ScrollVisibleService;
}(BeanStub));
export { ScrollVisibleService };
