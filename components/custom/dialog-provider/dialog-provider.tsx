'use client';
/**
 * DialogProvider Component
 * 
 * A global dialog/modal provider that handles displaying dialogs and loading spinners.
 * Connects to the Redux store to manage dialog state across the application.
 * 
 * Features:
 * - Displays modal dialogs with customizable content
 * - Shows loading spinners during async operations
 * - Supports auto-closing dialogs after a timeout
 * - Manages dialog state through Redux
 * - Provides consistent dialog styling across the application
 */
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/ui/dialog";
import { Button } from "components/ui/button";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { toggleDialog } from "@/app/store/features/dialog/dialogSlice";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { config } from "appConfig";
import { Spinner } from "../spinner/spinner";

export default function DialogProvider() {
    const isOpen = useAppSelector(state => state.spinner.isActive)
    const content = useAppSelector(state => state.spinner.content)
    const autoclose = useAppSelector(state => state.spinner.autoClose)
    const isSpinner = useAppSelector(state => state.spinner.isSpinner)

    const dispatch = useAppDispatch();

    const close = () => dispatch(toggleDialog());

    useEffect(() => {
        if (autoclose) setTimeout(() => close(), 1000);
    }, [autoclose]);


    return (
        <>
            {isSpinner ? 
                <Spinner isActive={isOpen} />
                :
                <Dialog open={isOpen} onOpenChange={close} >
                    <DialogContent className="min-w-[90vw] min-h-[90vh]">
                        <DialogHeader>
                            <DialogTitle>{content?.header}</DialogTitle>
                        </DialogHeader>
                        {content?.body}
                    </DialogContent>
                </Dialog>
            }
        </>
    );
}