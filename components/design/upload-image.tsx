'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function UploadImage() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1>Upload Your Image</h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();

                        if (!inputFileRef.current?.files) {
                            throw new Error('No file selected');
                        }

                        const file = inputFileRef.current.files[0];

                        const response = await fetch(
                            `/api/upload-logo?filename=${file.name}`,
                            {
                                method: 'POST',
                                body: file,
                            },
                        );

                        const newBlob = (await response.json()) as PutBlobResult;

                        setBlob(newBlob);
                    }}
                >
                    <input name="file" ref={inputFileRef} type="file" required />
                    <button type="submit">Upload</button>
                </form>
            </CardContent>
            {blob && (
                <div>
                    Blob url: <a href={blob.url}>{blob.url}</a>
                </div>
            )}
        </Card>
    );
}