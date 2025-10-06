import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET all products
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { name, price, category, description, quantity, images } = body;

    // Validate required fields
    if (!name || !price || !category || !description || quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate images
    if (images && images.length > 3) {
      return NextResponse.json(
        { error: 'Cannot have more than 3 images' },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
      quantity,
      images: images || [],
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
