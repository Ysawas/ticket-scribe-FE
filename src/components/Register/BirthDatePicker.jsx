
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FormControl, FormMessage } from "@/components/ui/form";

const BirthDatePicker = ({ selectedDate, onDateChange }) => {
  const [dateInputMode, setDateInputMode] = useState("calendar"); // "calendar" or "manual"
  const [manualDateInput, setManualDateInput] = useState(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
  );

  const handleManualDateChange = (e) => {
    const inputValue = e.target.value;
    setManualDateInput(inputValue);
    
    // Try to parse the date
    try {
      const parsedDate = parse(inputValue, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        onDateChange(parsedDate);
      } else {
        onDateChange(null);
      }
    } catch (error) {
      onDateChange(null);
    }
  };

  const handleCalendarDateChange = (date) => {
    onDateChange(date);
    if (date) {
      setManualDateInput(format(date, "yyyy-MM-dd"));
    }
  };

  const toggleDateInputMode = () => {
    setDateInputMode(prev => prev === "calendar" ? "manual" : "calendar");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Label>Birth Date</Label>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={toggleDateInputMode}
          className="text-xs"
        >
          {dateInputMode === "calendar" ? "Enter manually" : "Use calendar"}
        </Button>
      </div>
      
      <div className="mt-1">
        {dateInputMode === "calendar" ? (
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleCalendarDateChange}
                disabled={(date) => date > new Date()}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={1920}
                toYear={new Date().getFullYear()}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <FormControl>
              <Input
                type="date"
                value={manualDateInput}
                onChange={handleManualDateChange}
                max={format(new Date(), "yyyy-MM-dd")}
                className="w-full"
                placeholder="YYYY-MM-DD"
              />
            </FormControl>
            <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD (e.g., 1990-01-31)</p>
          </>
        )}
      </div>
      <FormMessage />
    </div>
  );
};

export default BirthDatePicker;
