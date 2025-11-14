import { Calendar, Users, DoorOpen, GraduationCap, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "rooms", label: "Rooms", icon: DoorOpen },
    { id: "groups", label: "Groups", icon: GraduationCap },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          TimeBalance AI
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Smart Scheduling</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-secondary hover:shadow-sm",
                currentView === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
          <p className="text-sm font-medium mb-1">AI-Powered</p>
          <p className="text-xs text-muted-foreground">
            Automatic conflict detection and resolution
          </p>
        </div>
      </div>
    </aside>
  );
};
