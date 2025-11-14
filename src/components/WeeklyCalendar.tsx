import { cn } from "@/lib/utils";

interface TimetableSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  group: string;
  color: number;
  hasConflict?: boolean;
}

interface WeeklyCalendarProps {
  slots: Record<string, TimetableSlot[]>;
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const slotColors = [
  "bg-timetable-slot1",
  "bg-timetable-slot2",
  "bg-timetable-slot3",
  "bg-timetable-slot4",
  "bg-timetable-slot5",
  "bg-timetable-slot6",
];

export const WeeklyCalendar = ({ slots }: WeeklyCalendarProps) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-6 border-b border-border bg-muted/50">
            <div className="p-4 font-semibold text-sm">Time</div>
            {days.map((day) => (
              <div key={day} className="p-4 font-semibold text-sm text-center border-l border-border">
                {day}
              </div>
            ))}
          </div>
          
          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="grid grid-cols-6 border-b border-border hover:bg-muted/30 transition-colors">
              <div className="p-4 text-sm text-muted-foreground font-medium">
                {time}
              </div>
              {days.map((day) => {
                const key = `${day}-${timeIndex}`;
                const daySlots = slots[key] || [];
                
                return (
                  <div
                    key={key}
                    className="p-2 border-l border-border min-h-[80px] relative"
                  >
                    {daySlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={cn(
                          "rounded-md p-2 mb-2 cursor-pointer transition-all duration-200",
                          "hover:shadow-lg hover:scale-[1.02]",
                          slotColors[slot.color % slotColors.length],
                          "text-white text-xs",
                          slot.hasConflict && "ring-2 ring-destructive ring-offset-2"
                        )}
                      >
                        <div className="font-semibold">{slot.subject}</div>
                        <div className="opacity-90 mt-1">{slot.teacher}</div>
                        <div className="opacity-75 text-[10px] mt-1">
                          {slot.room} • {slot.group}
                        </div>
                        {slot.hasConflict && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
