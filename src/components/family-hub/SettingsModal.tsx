import { useState } from "react";
import { X, Plus, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  initials: string;
  color: string;
}

interface CalendarSource {
  id: string;
  name: string;
  type: "google" | "ical" | "caldav";
  member: string;
}

interface TaskSource {
  id: string;
  name: string;
  type: "google-keep" | "todoist" | "notion";
  member: string;
}

// Sample data
const sampleMembers: FamilyMember[] = [
  { id: "1", name: "AJ", email: "No email set", initials: "AJ", color: "member-orange" },
  { id: "2", name: "TJ", email: "No email set", initials: "TJ", color: "member-blue" }
];

const sampleCalendarSources: CalendarSource[] = [
  { id: "1", name: "My Google Calendar", type: "google", member: "AJ" }
];

const sampleTaskSources: TaskSource[] = [
  { id: "1", name: "My Google Keep", type: "google-keep", member: "AJ" }
];

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState("household");
  const [members, setMembers] = useState<FamilyMember[]>(sampleMembers);
  const [calendarSources, setCalendarSources] = useState<CalendarSource[]>(sampleCalendarSources);
  const [taskSources, setTaskSources] = useState<TaskSource[]>(sampleTaskSources);
  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newCalendarName, setNewCalendarName] = useState("");
  const [newCalendarType, setNewCalendarType] = useState<"google" | "ical" | "caldav">("google");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskType, setNewTaskType] = useState<"google-keep" | "todoist" | "notion">("google-keep");

  const getColorDot = (color: string) => {
    const colorMap = {
      "member-orange": "bg-member-orange",
      "member-blue": "bg-member-blue", 
      "member-green": "bg-member-green",
      "member-purple": "bg-member-purple"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-400";
  };

  const addCalendarSource = () => {
    if (newCalendarName.trim()) {
      const newSource: CalendarSource = {
        id: Date.now().toString(),
        name: newCalendarName,
        type: newCalendarType,
        member: "AJ" // Default to first member
      };
      setCalendarSources([...calendarSources, newSource]);
      setNewCalendarName("");
      setShowAddCalendar(false);
    }
  };

  const addTaskSource = () => {
    if (newTaskName.trim()) {
      const newSource: TaskSource = {
        id: Date.now().toString(),
        name: newTaskName,
        type: newTaskType,
        member: "AJ" // Default to first member
      };
      setTaskSources([...taskSources, newSource]);
      setNewTaskName("");
      setShowAddTask(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Settings
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="household">Household</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="household" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Household Members</h3>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className={getColorDot(member.color)}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${getColorDot(member.color)}`} />
                      <Select defaultValue={member.color}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member-orange">Orange</SelectItem>
                          <SelectItem value="member-blue">Blue</SelectItem>
                          <SelectItem value="member-green">Green</SelectItem>
                          <SelectItem value="member-purple">Purple</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Family Member
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Integration Settings</h3>
                <p className="text-sm text-muted-foreground">Connect your calendars and task lists for automatic synchronization</p>
              </div>
              <Button className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Sync All</span>
              </Button>
            </div>

            {/* Calendar Sources */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">📅 Calendar Sources</h4>
                  <p className="text-sm text-muted-foreground">Connect Google Calendar, iCal feeds, or CalDAV accounts</p>
                </div>
                <Button onClick={() => setShowAddCalendar(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Calendar
                </Button>
              </div>

              {showAddCalendar && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h5 className="font-medium">Add Calendar Source</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calendar-name">Name</Label>
                      <Input
                        id="calendar-name"
                        value={newCalendarName}
                        onChange={(e) => setNewCalendarName(e.target.value)}
                        placeholder="My Google Calendar"
                      />
                    </div>
                    <div>
                      <Label htmlFor="calendar-type">Type</Label>
                      <Select value={newCalendarType} onValueChange={(value: any) => setNewCalendarType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Calendar</SelectItem>
                          <SelectItem value="ical">iCal URL</SelectItem>
                          <SelectItem value="caldav">CalDAV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={addCalendarSource}>Add</Button>
                    <Button variant="outline" onClick={() => setShowAddCalendar(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {calendarSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">{source.type.replace('-', ' ')}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Sources */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">✓ Task Sources</h4>
                  <p className="text-sm text-muted-foreground">Connect Google Keep, Todoist, or Notion for task synchronization</p>
                </div>
                <Button onClick={() => setShowAddTask(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tasks
                </Button>
              </div>

              {showAddTask && (
                <div className="border rounded-lg p-4 space-y-4">
                  <h5 className="font-medium">Add Task Source</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task-name">Name</Label>
                      <Input
                        id="task-name"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="My Google Keep"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-type">Type</Label>
                      <Select value={newTaskType} onValueChange={(value: any) => setNewTaskType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google-keep">Google Keep</SelectItem>
                          <SelectItem value="todoist">Todoist</SelectItem>
                          <SelectItem value="notion">Notion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={addTaskSource}>Add</Button>
                    <Button variant="outline" onClick={() => setShowAddTask(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {taskSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-sm text-muted-foreground capitalize">{source.type.replace('-', ' ')}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="default-view">Default View</Label>
                  <Select defaultValue="day">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                      <SelectItem value="agenda">Agenda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sync-interval">Sync Interval</Label>
                  <Select defaultValue="5">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Every minute</SelectItem>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="high-contrast" />
                  <Label htmlFor="high-contrast">High contrast mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="kiosk-mode" defaultChecked />
                  <Label htmlFor="kiosk-mode">Kiosk mode (fullscreen)</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};