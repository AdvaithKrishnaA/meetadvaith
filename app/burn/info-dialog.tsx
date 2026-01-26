'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"

export function BurnInfoDialog({ triggerText, iconTrigger = false }: { triggerText: string, iconTrigger?: boolean }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {iconTrigger ? (
                    <button className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors mb-2">
                        <HelpCircle className="w-3 h-3" />
                        {triggerText}
                    </button>
                ) : (
                    <Button className="mt-4">
                        {triggerText}
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">What is Burn?</AlertDialogTitle>
                    <AlertDialogDescription className="space-y-4 text-base pt-2">
                        <div>
                            <strong className="text-zinc-900 dark:text-zinc-100">
                                Burn is a place for your negative thoughts to go…
                            </strong>
                            <br />
                            and never come back.
                        </div>

                        <div className="space-y-1">
                            <strong className="text-zinc-900 dark:text-zinc-100">
                                How does it work?
                            </strong>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>You write the thought.</li>
                                <li>We light the 'digital' fire 🔥</li>
                                <li>The thought disappears. (Very satisfying.)</li>
                            </ul>
                        </div>

                        <div className="space-y-1">
                            <strong className="text-zinc-900 dark:text-zinc-100">
                                What if it feels a little silly?
                            </strong>
                            <div>
                                It is. But sometimes silly is exactly what we need.
                            </div>
                        </div>

                        <div className="space-y-1">
                            <strong className="text-zinc-900 dark:text-zinc-100">
                                Why would I use this?
                            </strong>
                            <div>
                                Because arguing with negative thoughts is exhausting.
                                <br />
                                Burning them is faster.
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-full sm:w-auto">Got it</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
