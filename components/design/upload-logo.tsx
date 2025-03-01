import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Uploader from '../form/uploader'

type Props = {
    siteId : string
    defaultLogo : string;
}

const UploadLogo = ({siteId, defaultLogo}: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Logo And Favicon</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <Uploader siteId={siteId} defaultValue={defaultLogo} name="logo" />
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default UploadLogo