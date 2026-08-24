export interface WorkflowStep {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  color: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  timeSaved: string;
  steps: WorkflowStep[];
  outcome: string;
}

export const WORKFLOWS_DATA: WorkflowItem[] = [
  {
    id: 'lead-automation',
    title: 'Lead Automation',
    badge: 'Sales & Inbound',
    description: 'Instantly capture, qualify, notify, and sync every incoming prospective client without touching a spreadsheet.',
    timeSaved: '15 hrs/week saved',
    steps: [
      { id: '1', label: 'Website Form', sublabel: 'Prospect submits inquiry', icon: 'Globe', color: 'indigo' },
      { id: '2', label: 'Lead Captured', sublabel: 'Data parsed & verified', icon: 'Database', color: 'cyan' },
      { id: '3', label: 'Automatic Email', sublabel: 'Instant custom intro & PDF', icon: 'Mail', color: 'purple' },
      { id: '4', label: 'CRM Update', sublabel: 'Synced to HubSpot/Slack', icon: 'Workflow', color: 'emerald' },
      { id: '5', label: 'Follow-up', sublabel: 'Calendar reminder set', icon: 'CalendarCheck', color: 'amber' },
    ],
    outcome: '0 missed leads, 4-minute average response time, 40% higher close rate.',
  },
  {
    id: 'content-automation',
    title: 'Content Automation',
    badge: 'Marketing & Distribution',
    description: 'Transform a single high-level idea into multi-channel articles, social carousels, and newsletters on autopilot.',
    timeSaved: '20 hrs/week saved',
    steps: [
      { id: '1', label: 'Content Idea', sublabel: 'Topic or voice note input', icon: 'Lightbulb', color: 'amber' },
      { id: '2', label: 'AI Content Creation', sublabel: 'Long-form & social scripts', icon: 'Sparkles', color: 'purple' },
      { id: '3', label: 'Review', sublabel: '1-click human editorial approval', icon: 'CheckCircle2', color: 'indigo' },
      { id: '4', label: 'Schedule', sublabel: 'Queue into buffer/social calendar', icon: 'Clock', color: 'cyan' },
      { id: '5', label: 'Publish', sublabel: 'Live on LinkedIn, Blog, X', icon: 'Send', color: 'emerald' },
    ],
    outcome: '10x organic publishing volume with 80% less manual writing overhead.',
  },
  {
    id: 'customer-automation',
    title: 'Customer Automation',
    badge: 'Support & Retention',
    description: 'Deliver instant 24/7 client resolution, intelligent routing, and seamless escalation to your sales or support reps.',
    timeSaved: '25 hrs/week saved',
    steps: [
      { id: '1', label: 'Customer Message', sublabel: 'Chat, WhatsApp or Email', icon: 'MessageSquare', color: 'cyan' },
      { id: '2', label: 'AI Assistant', sublabel: 'Analyzes intent & knowledge base', icon: 'Bot', color: 'indigo' },
      { id: '3', label: 'Response', sublabel: 'Instant accurate answer provided', icon: 'Zap', color: 'amber' },
      { id: '4', label: 'Lead Qualification', sublabel: 'Budget & urgency evaluated', icon: 'Filter', color: 'purple' },
      { id: '5', label: 'Follow-up', sublabel: 'Meeting booked or ticket closed', icon: 'CheckSquare', color: 'emerald' },
    ],
    outcome: 'Instant resolution for 75% of queries; zero wait times during peak hours.',
  },
];
