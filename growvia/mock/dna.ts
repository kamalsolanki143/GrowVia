import type { DNAQuestion } from "@/types";

export const dnaQuestions: DNAQuestion[] = [
  {
    id: 1,
    question: "When you have free time, you prefer to?",
    options: [
      { text: "Build something new or write code", category: "Technical", value: 1 },
      { text: "Design something visually appealing", category: "Creative", value: 1 },
      { text: "Lead or organize a group activity", category: "Leadership", value: 1 },
      { text: "Analyze data, patterns, or puzzles", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 2,
    question: "Your friends would describe you as?",
    options: [
      { text: "The builder who always makes things", category: "Technical", value: 1 },
      { text: "The thinker who analyzes everything", category: "Analytical", value: 1 },
      { text: "The creative with great taste", category: "Creative", value: 1 },
      { text: "The connector who brings people together", category: "Social", value: 1 },
    ],
  },
  {
    id: 3,
    question: "Which energizes you most?",
    options: [
      { text: "Creating and launching functional tools", category: "Technical", value: 1 },
      { text: "Helping others and mentoring", category: "Social", value: 1 },
      { text: "Managing projects and driving outcomes", category: "Leadership", value: 1 },
      { text: "Finding patterns in complex data", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 4,
    question: "When working on a project you?",
    options: [
      { text: "Jump in and start building immediately", category: "Technical", value: 1 },
      { text: "Take charge and organize the team", category: "Leadership", value: 1 },
      { text: "Focus on how it looks and feels", category: "Creative", value: 1 },
      { text: "Ensure everyone is collaborating well", category: "Social", value: 1 },
    ],
  },
  {
    id: 5,
    question: "Your ideal work environment?",
    options: [
      { text: "A quiet space to focus and analyze", category: "Analytical", value: 1 },
      { text: "A highly collaborative, people-first office", category: "Social", value: 1 },
      { text: "A fast-paced startup where I can lead", category: "Leadership", value: 1 },
      { text: "A creative studio with bold aesthetics", category: "Creative", value: 1 },
    ],
  },
  {
    id: 6,
    question: "What motivates you most?",
    options: [
      { text: "Shipping a product that works perfectly", category: "Technical", value: 1 },
      { text: "Empowering others to succeed", category: "Social", value: 1 },
      { text: "Solving complex logical problems", category: "Analytical", value: 1 },
      { text: "Creating beautiful user experiences", category: "Creative", value: 1 },
    ],
  },
  {
    id: 7,
    question: "When you face a problem you?",
    options: [
      { text: "Build a quick technical solution", category: "Technical", value: 1 },
      { text: "Get the right people together to solve it", category: "Leadership", value: 1 },
      { text: "Redesign the workflow around the problem", category: "Creative", value: 1 },
      { text: "Break it into logical, measurable parts", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 8,
    question: "Which excites you most?",
    options: [
      { text: "Building robust algorithms", category: "Technical", value: 1 },
      { text: "Managing a large team to success", category: "Leadership", value: 1 },
      { text: "Analyzing trends to predict outcomes", category: "Analytical", value: 1 },
      { text: "Facilitating community growth", category: "Social", value: 1 },
    ],
  },
  {
    id: 9,
    question: "Your learning style is?",
    options: [
      { text: "Hands-on building and experimenting", category: "Technical", value: 1 },
      { text: "Learning in groups and discussions", category: "Social", value: 1 },
      { text: "Visual learning with moodboards", category: "Creative", value: 1 },
      { text: "Structured logical frameworks and charts", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 10,
    question: "In 5 years you see yourself?",
    options: [
      { text: "As a senior engineer or architect", category: "Technical", value: 1 },
      { text: "Founding or running a company", category: "Leadership", value: 1 },
      { text: "Leading community initiatives or HR", category: "Social", value: 1 },
      { text: "Solving data problems at scale", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 11,
    question: "When given a new tool, you usually:",
    options: [
      { text: "Read the documentation and specs", category: "Analytical", value: 1 },
      { text: "Play around with its UI/UX", category: "Creative", value: 1 },
      { text: "Hack it to see how it works", category: "Technical", value: 1 },
      { text: "Show others how to use it", category: "Social", value: 1 },
    ],
  },
  {
    id: 12,
    question: "You handle stress best by:",
    options: [
      { text: "Making a structured plan of attack", category: "Analytical", value: 1 },
      { text: "Delegating tasks to the right people", category: "Leadership", value: 1 },
      { text: "Talking it out with peers", category: "Social", value: 1 },
      { text: "Diving deep into the code/work", category: "Technical", value: 1 },
    ],
  },
  {
    id: 13,
    question: "If you were to start a podcast, it would be about:",
    options: [
      { text: "Emerging tech and software", category: "Technical", value: 1 },
      { text: "Design, art, and aesthetics", category: "Creative", value: 1 },
      { text: "Business strategy and entrepreneurship", category: "Leadership", value: 1 },
      { text: "Human psychology and relationships", category: "Social", value: 1 },
    ],
  },
  {
    id: 14,
    question: "What's your biggest pet peeve?",
    options: [
      { text: "Inefficient or buggy systems", category: "Technical", value: 1 },
      { text: "Ugly, clunky interfaces", category: "Creative", value: 1 },
      { text: "Lack of clear direction or vision", category: "Leadership", value: 1 },
      { text: "Decisions made without data", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 15,
    question: "When buying a new gadget, you care most about:",
    options: [
      { text: "The hardware specs and performance", category: "Technical", value: 1 },
      { text: "How sleek and beautiful it looks", category: "Creative", value: 1 },
      { text: "How the community rates it", category: "Social", value: 1 },
      { text: "The ROI and longevity metrics", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 16,
    question: "At a networking event, you are usually:",
    options: [
      { text: "Connecting with everyone in the room", category: "Social", value: 1 },
      { text: "Pitching an idea or vision", category: "Leadership", value: 1 },
      { text: "Discussing deep technical topics", category: "Technical", value: 1 },
      { text: "Observing and analyzing the crowd", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 17,
    question: "Your favorite type of feedback is:",
    options: [
      { text: "Data-driven performance metrics", category: "Analytical", value: 1 },
      { text: "Code reviews and technical suggestions", category: "Technical", value: 1 },
      { text: "Constructive critique on aesthetics", category: "Creative", value: 1 },
      { text: "Praise for team harmony", category: "Social", value: 1 },
    ],
  },
  {
    id: 18,
    question: "If you had a superpower, what would it be?",
    options: [
      { text: "Mind control to inspire action", category: "Leadership", value: 1 },
      { text: "Instantly fixing broken things", category: "Technical", value: 1 },
      { text: "Seeing future trends in data", category: "Analytical", value: 1 },
      { text: "Empathy to understand everyone", category: "Social", value: 1 },
    ],
  },
  {
    id: 19,
    question: "What app do you use most?",
    options: [
      { text: "GitHub, IDE, or terminal", category: "Technical", value: 1 },
      { text: "Figma, Pinterest, or Instagram", category: "Creative", value: 1 },
      { text: "LinkedIn, WhatsApp, or Discord", category: "Social", value: 1 },
      { text: "Excel, Notion, or Analytics", category: "Analytical", value: 1 },
    ],
  },
  {
    id: 20,
    question: "When you finish a big project, you:",
    options: [
      { text: "Analyze the post-mortem data", category: "Analytical", value: 1 },
      { text: "Celebrate with the team", category: "Social", value: 1 },
      { text: "Plan the next big initiative", category: "Leadership", value: 1 },
      { text: "Showcase the final design publicly", category: "Creative", value: 1 },
    ],
  },
];
