import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { deleteMultipleFromGCS } from '@/lib/gcs';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET single product
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product (Admin only)
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const body = await request.json();
    const { name, price, category, description, quantity, images } = body;

    // Validate images
    if (images && images.length > 3) {
      return NextResponse.json(
        { error: 'Cannot have more than 3 images' },
        { status: 400 }
      );
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        description,
        quantity,
        images,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product (Admin only)
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete images from GCS
    if (product.images && product.images.length > 0) {
      try {
        await deleteMultipleFromGCS(product.images);
      } catch (error) {
        console.error('Error deleting images from GCS:', error);
        // Continue with product deletion even if image deletion fails
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
