<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Order;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        $orders = Order::with('orderDetails', 'customer')->get();

        return Inertia::render('Products/Index', [
            'products' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'stock' => $product->stock, // หรือใช้ชื่อคอลัมน์อื่นๆ ที่คุณใช้ในฐานข้อมูล
                ];
            }),
            'orders' => $orders->map(function ($order) {
                return [
                    'order_id' => $order->id,
                    'customer_name' => $order->customer->name ?? 'Unknown',
                    'order_details' => $order->orderDetails->map(function ($detail) {
                        return [
                            'product_id' => $detail->product_id,
                            'quantity' => $detail->quantity,
                        ];
                    }),
                ];
            }),
        ]);
    }
}
