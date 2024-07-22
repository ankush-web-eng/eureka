import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
    try {
        const formdata = await req.formData()
        const file = formdata.get('file') as File;
        console.log(file);
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        if (!uploadResponse) {
            return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        }

        const url = (uploadResponse as { secure_url: string }).secure_url;
        return NextResponse.json({ url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}