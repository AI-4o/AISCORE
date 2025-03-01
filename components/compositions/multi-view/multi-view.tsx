'use client';

import { useState } from "react";
import { Button } from "ui/button";

const stdClasses = "flex w-full justify-center items-center";
export type View = Partial<{
    name: string;
    id: string;
    header: React.ReactNode;
    body: React.ReactNode;
}>

export interface MultiViewProps {
    views: View[];
    commonBanner?: React.ReactNode;
}

const a = 33
export default function MultiView({views, commonBanner}: MultiViewProps) {

    const [currentView, setCurrentView] = useState(views[0]);

    return (
        <div className={`${stdClasses} flex-col`}>
            {commonBanner && (
                <div className={`${stdClasses} view-banner`}>
                    {commonBanner}
                </div>
            )}
            <div className={`${stdClasses} view-sections gap-2`}>
                 { views.map((view) => 
                    <Button onClick={() => setCurrentView(view)} key={view.id} variant="outline" className="w-full">
                        {view?.name}
                    </Button>
                )}
            </div>
            <div className={`${stdClasses} view-banner`}>
                {currentView?.header}
            </div>
            <div className={`${stdClasses} view-sections`}>
                {currentView?.body}
            </div>
        </div>
    );
}