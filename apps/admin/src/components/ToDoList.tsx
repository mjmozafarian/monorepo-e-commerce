"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

const ToDoList = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="">
            <h1 className="text-lg font-medium mb-6">To-Do List</h1>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <CalendarIcon />
                        {date ? format(date, "PPP") : "Pick a Date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                        className="rounded-lg border"
                    />
                </PopoverContent>
            </Popover>
            {/* LIST */}
            <ScrollArea className="max-h-[400px] mt-4 overflow-y-auto">
                {/* LIST ITEM */}
                <div className="flex flex-col gap-4">
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" checked />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                    <Card className="p-4 ">
                        <div className="flex items-center gap-4">
                            <Checkbox id="item-1" />
                            <label
                                htmlFor="item-1"
                                className="text-sm text-muted-foreground"
                            >
                                Finish the quarterly report
                            </label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
};

export default ToDoList;
