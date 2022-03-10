"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var constants_1 = require("../../config/constants");
var images_1 = require("../../services/images");
var npmlog_1 = __importDefault(require("npmlog"));
var utils_1 = require("../../helpers/utils");
var apiRouter = express_1.default.Router();
// @route     GET /api/images
// @desc      Resize & save image to specific width and height.
// @access    Public
apiRouter.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, filename, width, height, format, imagePath, thumbPath, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.query, filename = _a.filename, width = _a.width, height = _a.height, format = _a.format;
                imagePath = path_1.default.join('assets/full', filename + '.jpg');
                thumbPath = path_1.default.join(constants_1.IMAGES_CACHE_DIR, "".concat(filename, "-").concat(width, "x").concat(height, ".").concat(format || 'jpg'));
                // Check width and height if not int
                if (!parseInt(width) || !parseInt(height))
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Invalid width or height.' })];
                // Check format
                if (format && !(0, utils_1.isFormatAllowed)(format))
                    return [2 /*return*/, res
                            .status(400)
                            .json({ success: false, message: 'Invalid format.' })];
                // Check if image exists
                if (!fs_1.default.existsSync(imagePath))
                    return [2 /*return*/, res
                            .status(401)
                            .json({ success: false, message: 'Unable to find the image.' })];
                if (!!fs_1.default.existsSync(thumbPath)) return [3 /*break*/, 2];
                npmlog_1.default.info('[Images]', "Resizing ".concat(filename, " to ").concat(width, "x").concat(height, "..."));
                return [4 /*yield*/, (0, images_1.resizeSaveImage)(imagePath, parseInt(width), parseInt(height), thumbPath, format)];
            case 1:
                _b.sent();
                npmlog_1.default.info('[Images]', "Resized ".concat(filename, " to ").concat(width, "x").concat(height, "."));
                _b.label = 2;
            case 2:
                npmlog_1.default.info('[Images]', "".concat(filename, "-").concat(width, "x").concat(height, " is accessed."));
                // Send file
                res.sendFile(thumbPath, { root: '.' });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                res.status(500).json({
                    success: false,
                    message: err_1.message ||
                        'Internal server error. Please contact administrators.',
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = apiRouter;
