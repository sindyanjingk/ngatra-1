"use client"
import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { NewDomain } from './new-domain';
import HaveDomain from './have-domain';
import SubDomain from './sub-domain';

type Props = {}

const OnboardForm = (props: Props) => {
    const [value, setValue] = useState("new");

    return (
        <div className="space-y-2">
            <div className='bg-gray-100 p-4 rounded-lg'>
                <RadioGroup value={value} onValueChange={setValue} className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            id="new-domain"
                            value="new"
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor="new-domain" className="text-gray-700 text-md font-bold">
                            I want to register a new domain
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            id="existing-domain"
                            value="existing"
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="existing-domain" className="text-gray-700 text-md font-bold">
                            I have a domain
                        </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            id="subdomain"
                            value="subdomain"
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                        />
                        <Label htmlFor="subdomain" className="text-gray-700 text-md font-bold">
                            I want to place the panel on a subdomain
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            {
                value === "new" &&
                <NewDomain/>
            }
            {
                value === "existing" &&
                <HaveDomain/>
            }
            {
                value === "subdomain" &&
                <SubDomain/>
            }
        </div>
    );
}

export default OnboardForm