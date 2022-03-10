"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var constants_1 = require("./config/constants");
var cors_1 = __importDefault(require("cors"));
var api_1 = __importDefault(require("./routes/api"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.use('/api', api_1.default);
app.get('/', function (req, res) {
    res.send('Backend says hi');
});
app.listen(constants_1.PORT, function () {
    console.log("Server started on http://localhost:".concat(constants_1.PORT));
});
exports.default = app;
