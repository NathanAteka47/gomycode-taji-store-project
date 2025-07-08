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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/seeder.ts
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("./models/productModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.default.deleteMany();
    yield productModel_1.default.insertMany([
        {
            name: 'Beef Stew',
            description: 'Delicious Kenyan-style beef stew',
            image: '/images/beef.jpg',
            price: 350,
            category: 'food',
        },
        {
            name: 'Taji Bottled Water',
            description: 'Clean mineral water 500ml',
            image: '/images/water.jpg',
            price: 50,
            category: 'water',
        },
        {
            name: 'Chocolate Cake Slice',
            description: 'Moist chocolate cake with frosting',
            image: '/images/cake.jpg',
            price: 200,
            category: 'cakes',
        },
    ]);
    console.log('Seeded sample products!');
    process.exit();
}));
