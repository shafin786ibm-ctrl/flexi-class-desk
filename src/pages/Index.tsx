import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardStats } from "@/components/DashboardStats";
import { WeeklyCalendar } from "@/components/WeeklyCalendar";
import { ResourceCard } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Users, DoorOpen, GraduationCap, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState("dashboard");
  
  // Sample data
  const [teachers] = useState([
    { id: "1", name: "Dr. Smith", info: "Mathematics", availability: "Mon-Fri 8AM-4PM" },
    { id: "2", name: "Prof. Johnson", info: "Physics", availability: "Mon-Fri 9AM-5PM" },
    { id: "3", name: "Ms. Davis", info: "Chemistry", availability: "Mon-Fri 8AM-3PM" },
  ]);

  const [rooms] = useState([
    { id: "1", name: "Room 101", info: "Capacity: 30" },
    { id: "2", name: "Lab A", info: "Capacity: 25" },
    { id: "3", name: "Room 203", info: "Capacity: 40" },
  ]);

  const [groups] = useState([
    { id: "1", name: "CS-A", info: "Computer Science Year 1" },
    { id: "2", name: "CS-B", info: "Computer Science Year 2" },
    { id: "3", name: "PHY-A", info: "Physics Year 1" },
  ]);

  const [timetableSlots] = useState({
    "Monday-0": [{ id: "1", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", group: "CS-A", color: 0 }],
    "Monday-1": [{ id: "2", subject: "Physics", teacher: "Prof. Johnson", room: "Lab A", group: "PHY-A", color: 1 }],
    "Tuesday-0": [{ id: "3", subject: "Chemistry", teacher: "Ms. Davis", room: "Room 203", group: "CS-B", color: 2 }],
    "Wednesday-2": [{ id: "4", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", group: "CS-B", color: 0 }],
    "Thursday-1": [{ id: "5", subject: "Physics", teacher: "Prof. Johnson", room: "Lab A", group: "CS-A", color: 1, hasConflict: true }],
    "Friday-0": [{ id: "6", subject: "Chemistry", teacher: "Ms. Davis", room: "Room 203", group: "PHY-A", color: 2 }],
  });

  const handleGenerate = () => {
    toast({
      title: "Generating Timetable",
      description: "AI is analyzing constraints and creating optimal schedule...",
    });
  };

  const handleResolveConflicts = () => {
    toast({
      title: "Resolving Conflicts",
      description: "AI is automatically resolving scheduling conflicts...",
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <p className="text-muted-foreground mt-1">
                  Overview of your timetable system
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleResolveConflicts} variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Resolve Conflicts
                </Button>
                <Button onClick={handleGenerate} className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Generate Timetable
                </Button>
              </div>
            </div>
            
            <DashboardStats
              teachersCount={teachers.length}
              roomsCount={rooms.length}
              groupsCount={groups.length}
              scheduledClasses={Object.keys(timetableSlots).length}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ResourceCard
                title="Teachers"
                resources={teachers}
                onAdd={() => toast({ title: "Add teacher modal would open here" })}
                onEdit={() => toast({ title: "Edit teacher modal would open here" })}
                onDelete={() => toast({ title: "Delete confirmation would appear here" })}
                icon={<Users className="w-5 h-5" />}
              />
              <ResourceCard
                title="Rooms"
                resources={rooms}
                onAdd={() => toast({ title: "Add room modal would open here" })}
                onEdit={() => toast({ title: "Edit room modal would open here" })}
                onDelete={() => toast({ title: "Delete confirmation would appear here" })}
                icon={<DoorOpen className="w-5 h-5" />}
              />
              <ResourceCard
                title="Groups"
                resources={groups}
                onAdd={() => toast({ title: "Add group modal would open here" })}
                onEdit={() => toast({ title: "Edit group modal would open here" })}
                onDelete={() => toast({ title: "Delete confirmation would appear here" })}
                icon={<GraduationCap className="w-5 h-5" />}
              />
            </div>
          </div>
        );

      case "timetable":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Weekly Timetable</h2>
                <p className="text-muted-foreground mt-1">
                  Interactive schedule view with conflict detection
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleResolveConflicts} variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Resolve Conflicts
                </Button>
                <Button onClick={handleGenerate} className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Regenerate
                </Button>
              </div>
            </div>
            <WeeklyCalendar slots={timetableSlots} />
          </div>
        );

      case "teachers":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Teachers Management</h2>
              <p className="text-muted-foreground mt-1">
                Manage teacher profiles and availability
              </p>
            </div>
            <ResourceCard
              title="All Teachers"
              resources={teachers}
              onAdd={() => toast({ title: "Add teacher modal would open here" })}
              onEdit={() => toast({ title: "Edit teacher modal would open here" })}
              onDelete={() => toast({ title: "Delete confirmation would appear here" })}
              icon={<Users className="w-5 h-5" />}
            />
          </div>
        );

      case "rooms":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Rooms Management</h2>
              <p className="text-muted-foreground mt-1">
                Manage classroom and lab spaces
              </p>
            </div>
            <ResourceCard
              title="All Rooms"
              resources={rooms}
              onAdd={() => toast({ title: "Add room modal would open here" })}
              onEdit={() => toast({ title: "Edit room modal would open here" })}
              onDelete={() => toast({ title: "Delete confirmation would appear here" })}
              icon={<DoorOpen className="w-5 h-5" />}
            />
          </div>
        );

      case "groups":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Groups Management</h2>
              <p className="text-muted-foreground mt-1">
                Manage student groups and classes
              </p>
            </div>
            <ResourceCard
              title="All Groups"
              resources={groups}
              onAdd={() => toast({ title: "Add group modal would open here" })}
              onEdit={() => toast({ title: "Edit group modal would open here" })}
              onDelete={() => toast({ title: "Delete confirmation would appear here" })}
              icon={<GraduationCap className="w-5 h-5" />}
            />
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Settings</h2>
            <p className="text-muted-foreground">Configure your timetable preferences</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
