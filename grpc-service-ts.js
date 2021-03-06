"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 使用ts写的grpc服务
 */
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(__dirname + '/protos/helloworld.proto', {});
var hello_proto = grpc.loadPackageDefinition(packageDefinition);
var packageDefinition2 = protoLoader.loadSync(__dirname + '/protos/helloworld2.proto', {});
var hello_proto2 = grpc.loadPackageDefinition(packageDefinition2);
var Hello = /** @class */ (function () {
    function Hello() {
    }
    /**
     * Implements the SayHello RPC method.
     */
    Hello.prototype.sayHello = function (call, callback) {
        console.log(call.request);
        /** do something */
        callback(null, { message: "请求参数：" + call.request.name + ",返回值：sayHello" });
    };
    Hello.prototype.sayHello2 = function (call, callback) {
        console.log(call.request);
        /** do something */
        callback(null, { message: "请求参数：" + call.request.name + ",返回值：openTheDoor" });
    };
    Hello.prototype.sayHello3 = function (call, callback) {
        console.log(call.request);
        /** do something */
        callback(null, { message: "请求参数：" + call.request.name + ",返回值：openTheDoorx" });
    };
    Hello = __decorate([
        service
    ], Hello);
    return Hello;
}());
exports.Hello = Hello;
function service(constructor) {
    var Service = {};
    var methods = Object.keys(constructor.prototype);
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        Service[method] = (constructor.prototype)[method];
    }
    var server = new grpc.Server();
    server.addService(hello_proto.helloworld.Greeter.service, Service);
    server.addService(hello_proto2.helloworld.Greeter2.service, Service);
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("服务已启动，port:50051");
}
new Hello();
