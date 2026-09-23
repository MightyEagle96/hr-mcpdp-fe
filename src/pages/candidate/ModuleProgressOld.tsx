// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   BookOpen,
//   Check,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   Circle,
//   Clock3,
//   Lock,
//   Menu,
//   PlayCircle,
// } from "lucide-react";
// import { httpService } from "../../httpService";

// interface LearningTopic {
//   _id: string;
//   title: string;
//   order: number;
//   status: "locked" | "pending" | "incomplete" | "complete";
// }

// interface LearningUnit {
//   _id: string;
//   title: string;
//   description: string;
//   order: number;
//   score?: number;
//   topics: LearningTopic[];
// }

// interface ModuleInfo {
//   _id: string;
//   title: string;
//   description: string;
//   code: string;
//   imageUrl?: string;
// }

// interface ModuleProgressData {
//   progressPercentage: number;
//   completed: boolean;
//   pretestTaken: boolean;
//   posttestTaken: boolean;
//   currentContent: {
//     topic: string;
//     unit: string;
//   };
//   nextContent?: {
//     topic: string;
//     unit: string;
//   };
// }

// interface ModuleLearningWorkspace {
//   module: ModuleInfo;
//   progress: ModuleProgressData;
//   units: LearningUnit[];
// }

// function ModuleProgressOld() {
//   const { id } = useParams();

//   const [workspace, setWorkspace] = useState<ModuleLearningWorkspace | null>(
//     null,
//   );

//   const [isLoading, setIsLoading] = useState(true);

//   const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

//   const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});

//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

//   useEffect(() => {
//     const fetchWorkspace = async () => {
//       try {
//         setIsLoading(true);

//         const response = await httpService.get(
//           `/moduleprogress/get_module_learning_workspace/${id}`,
//         );

//         if (response.data.success) {
//           const data = response.data.data;

//           setWorkspace(data);

//           /*
//            * Open the unit containing the current topic.
//            */
//           if (data.progress.currentContent?.unit) {
//             setOpenUnits({
//               [data.progress.currentContent.unit]: true,
//             });

//             setActiveTopicId(data.progress.currentContent.topic);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load module progress:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchWorkspace();
//     }
//   }, [id]);

//   const toggleUnit = (unitId: string) => {
//     setOpenUnits((current) => ({
//       ...current,
//       [unitId]: !current[unitId],
//     }));
//   };

//   const handleTopicClick = (topic: LearningTopic) => {
//     if (topic.status === "locked") {
//       return;
//     }

//     setActiveTopicId(topic._id);

//     setMobileSidebarOpen(false);
//   };

//   const activeTopic = useMemo(() => {
//     if (!workspace || !activeTopicId) {
//       return null;
//     }

//     for (const unit of workspace.units) {
//       const topic = unit.topics.find((item) => item._id === activeTopicId);

//       if (topic) {
//         return {
//           topic,
//           unit,
//         };
//       }
//     }

//     return null;
//   }, [workspace, activeTopicId]);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8]">
//         <div className="text-center">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C63C38]" />

//           <p className="mt-4 text-sm font-medium text-slate-500">
//             Loading your learning workspace...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (!workspace) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#F7F8F8] px-6">
//         <div className="text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C63C38]">
//             <BookOpen size={30} />
//           </div>

//           <h1 className="mt-5 text-xl font-bold text-slate-900">
//             Module unavailable
//           </h1>

//           <p className="mt-2 text-sm text-slate-500">
//             We couldn't load your learning progress.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F8F8]">
//       {/* Mobile overlay */}
//       {mobileSidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close navigation"
//           onClick={() => setMobileSidebarOpen(false)}
//           className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed bottom-0 left-0 top-0 z-50
//           w-[300px] border-r border-slate-200 bg-white
//           transition-transform duration-300
//           lg:sticky lg:top-0 lg:z-30
//           lg:h-screen lg:translate-x-0
//           ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="flex h-full flex-col">
//           {/* Sidebar Header */}
//           <div className="border-b border-slate-100 p-5">
//             <div className="flex items-center justify-between">
//               <div className="flex min-w-0 items-center gap-3">
//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C63C38]/10 text-[#C63C38]">
//                   <BookOpen size={19} />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                     MCPDP Module
//                   </p>

//                   <h2 className="truncate text-sm font-bold text-slate-900">
//                     {workspace.module.title}
//                   </h2>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setMobileSidebarOpen(false)}
//                 className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
//               >
//                 <ChevronLeft size={19} />
//               </button>
//             </div>

//             {/* Progress */}
//             <div className="mt-5">
//               <div className="flex items-center justify-between">
//                 <span className="text-xs font-semibold text-slate-500">
//                   Overall Progress
//                 </span>

//                 <span className="text-xs font-bold text-[#C63C38]">
//                   {workspace.progress.progressPercentage}%
//                 </span>
//               </div>

//               <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
//                 <div
//                   className="h-full rounded-full bg-[#C63C38] transition-all"
//                   style={{
//                     width: `${workspace.progress.progressPercentage}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex-1 overflow-y-auto p-4">
//             <div className="space-y-3">
//               {workspace.units.map((unit) => {
//                 const isOpen = openUnits[unit._id];

//                 const completedTopics = unit.topics.filter(
//                   (topic) => topic.status === "complete",
//                 ).length;

//                 return (
//                   <div key={unit._id}>
//                     {/* Unit */}
//                     <button
//                       type="button"
//                       onClick={() => toggleUnit(unit._id)}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50"
//                     >
//                       <div
//                         className={`
//                           flex h-8 w-8 shrink-0 items-center
//                           justify-center rounded-lg text-xs
//                           font-bold
//                           ${
//                             completedTopics === unit.topics.length &&
//                             unit.topics.length > 0
//                               ? "bg-emerald-50 text-emerald-600"
//                               : "bg-slate-100 text-slate-600"
//                           }
//                         `}
//                       >
//                         {completedTopics === unit.topics.length &&
//                         unit.topics.length > 0 ? (
//                           <Check size={15} />
//                         ) : (
//                           unit.order
//                         )}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="truncate text-xs font-bold text-slate-800">
//                           {unit.title}
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-slate-400">
//                           {completedTopics} of {unit.topics.length} topics
//                         </p>
//                       </div>

//                       <ChevronDown
//                         size={16}
//                         className={`
//                           shrink-0 text-slate-400
//                           transition-transform
//                           ${isOpen ? "rotate-180" : ""}
//                         `}
//                       />
//                     </button>

//                     {/* Topics */}
//                     {isOpen && (
//                       <div className="ml-4 border-l border-slate-200 pl-4">
//                         <div className="space-y-1">
//                           {unit.topics.map((topic) => {
//                             const isActive = activeTopicId === topic._id;

//                             const isLocked = topic.status === "locked";

//                             return (
//                               <button
//                                 key={topic._id}
//                                 type="button"
//                                 disabled={isLocked}
//                                 onClick={() => handleTopicClick(topic)}
//                                 className={`
//                                   flex w-full items-center
//                                   gap-3 rounded-xl px-3 py-2.5
//                                   text-left transition-all
//                                   ${
//                                     isActive
//                                       ? "bg-[#C63C38]/10 text-[#C63C38]"
//                                       : isLocked
//                                         ? "cursor-not-allowed text-slate-300"
//                                         : "text-slate-600 hover:bg-slate-50"
//                                   }
//                                 `}
//                               >
//                                 <TopicStatusIcon
//                                   status={topic.status}
//                                   active={isActive}
//                                 />

//                                 <span className="min-w-0 flex-1 truncate text-xs font-medium">
//                                   {topic.order}. {topic.title}
//                                 </span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// }

// interface TopicStatusIconProps {
//   status: LearningTopic["status"];
//   active: boolean;
// }

// function TopicStatusIcon({ status, active }: TopicStatusIconProps) {
//   if (status === "complete") {
//     return (
//       <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
//         <Check size={13} />
//       </span>
//     );
//   }

//   if (status === "locked") {
//     return (
//       <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-300">
//         <Lock size={14} />
//       </span>
//     );
//   }

//   if (active) {
//     return (
//       <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C63C38] text-white">
//         <PlayCircle size={14} />
//       </span>
//     );
//   }

//   if (status === "incomplete") {
//     return (
//       <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
//         <Clock3 size={13} />
//       </span>
//     );
//   }

//   return (
//     <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-400">
//       <Circle size={13} />
//     </span>
//   );
// }

// export default ModuleProgressOld;
