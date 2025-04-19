
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  Edit,
  Trash2,
  MessageSquare,
  Clock,
  Calendar,
  User,
  History,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { 
  getTicketById, 
  updateTicket, 
  deleteTicket, 
  getTicketComments, 
  addComment 
} from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import PriorityBadge from "@/components/PriorityBadge";
import { useAuth } from "@/contexts/AuthContext";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [priorityUpdate, setPriorityUpdate] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingTicket, setUpdatingTicket] = useState(false);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        // Mock ticket data
        const ticketMock = {
          id: parseInt(id),
          title: "Application crashes on startup",
          description: "When users try to open the application, it immediately crashes with the following error message: 'Segmentation fault'. This is happening on both Windows and Mac platforms, but seems more frequent on Windows 10 machines.\n\nWe've received 15 customer complaints about this issue in the last 24 hours.",
          status: "open",
          priority: "high",
          created_at: "2023-04-10T14:23:10Z",
          updated_at: "2023-04-10T14:23:10Z",
          created_by: {
            id: 1,
            name: "Jane Smith",
            email: "jane.smith@example.com",
          },
          assigned_to: {
            id: 2,
            name: "John Doe",
            email: "john.doe@example.com",
          },
          category: "Bug",
          attachments: [
            {
              id: 1,
              filename: "error_log.txt",
              url: "#",
              uploaded_at: "2023-04-10T14:25:30Z",
              size: "32KB",
            },
            {
              id: 2,
              filename: "screenshot.png",
              url: "#",
              uploaded_at: "2023-04-10T14:26:18Z",
              size: "215KB",
            },
          ],
        };

        // Mock comments data
        const commentsMock = [
          {
            id: 1,
            text: "I've started investigating this issue. Initial analysis suggests it might be related to the latest database update.",
            created_at: "2023-04-10T15:10:22Z",
            user: {
              id: 2,
              name: "John Doe",
              email: "john.doe@example.com",
            },
          },
          {
            id: 2,
            text: "Thanks for looking into this. The database update was deployed yesterday, which aligns with when we started getting these reports.",
            created_at: "2023-04-10T15:45:17Z",
            user: {
              id: 1,
              name: "Jane Smith",
              email: "jane.smith@example.com",
            },
          },
          {
            id: 3,
            text: "I've found the issue. There's a problem with the connection string format in the new update. Working on a fix now.",
            created_at: "2023-04-11T09:12:05Z",
            user: {
              id: 2,
              name: "John Doe",
              email: "john.doe@example.com",
            },
          },
        ];

        setTicket(ticketMock);
        setComments(commentsMock);
        setStatusUpdate(ticketMock.status);
        setPriorityUpdate(ticketMock.priority);
      } catch (error) {
        console.error("Error fetching ticket details:", error);
        toast.error("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setSubmittingComment(true);
    try {
      // In a real app, this would be:
      // await addComment(id, { text: newComment });
      // const updatedComments = await getTicketComments(id);

      // For the demo, we'll just add to our local state
      const newCommentObj = {
        id: comments.length + 1,
        text: newComment,
        created_at: new Date().toISOString(),
        user: {
          id: user?.id || 3,
          name: user?.name || "Current User",
          email: user?.email || "current.user@example.com",
        },
      };

      setComments([...comments, newCommentObj]);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateTicket = async () => {
    if (statusUpdate === ticket.status && priorityUpdate === ticket.priority) {
      toast.info("No changes to update");
      return;
    }

    setUpdatingTicket(true);
    try {
      // In a real app, this would be:
      // await updateTicket(id, { status: statusUpdate, priority: priorityUpdate });
      // const updatedTicket = await getTicketById(id);

      // For the demo, we'll just update our local state
      setTicket({
        ...ticket,
        status: statusUpdate,
        priority: priorityUpdate,
        updated_at: new Date().toISOString(),
      });

      // Add a comment about the update
      const updateComment = {
        id: comments.length + 1,
        text: `Updated ticket: ${
          statusUpdate !== ticket.status
            ? `status from ${ticket.status} to ${statusUpdate}`
            : ""
        } ${
          priorityUpdate !== ticket.priority && statusUpdate !== ticket.status
            ? " and "
            : ""
        } ${
          priorityUpdate !== ticket.priority
            ? `priority from ${ticket.priority} to ${priorityUpdate}`
            : ""
        }`,
        created_at: new Date().toISOString(),
        user: {
          id: user?.id || 3,
          name: user?.name || "Current User",
          email: user?.email || "current.user@example.com",
        },
        system: true,
      };

      setComments([...comments, updateComment]);
      toast.success("Ticket updated successfully");
    } catch (error) {
      toast.error("Failed to update ticket");
    } finally {
      setUpdatingTicket(false);
    }
  };

  const handleDeleteTicket = async () => {
    // Simple confirmation dialog
    if (!window.confirm("Are you sure you want to delete this ticket? This action cannot be undone.")) {
      return;
    }

    try {
      // In a real app, this would be:
      // await deleteTicket(id);
      toast.success("Ticket deleted successfully");
      navigate("/tickets");
    } catch (error) {
      toast.error("Failed to delete ticket");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Ticket Not Found</h2>
        <p className="text-gray-500 mb-6">
          The ticket you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/tickets">Back to Tickets</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/tickets">
              <ChevronLeft size={16} className="mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">
            Ticket #{ticket.id}
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/tickets/${id}/edit`)}
          >
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteTicket}>
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{ticket.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Created on{" "}
                {new Date(ticket.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap">{ticket.description}</div>
              
              {ticket.attachments?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment) => (
                      <div 
                        key={attachment.id} 
                        className="flex items-center p-2 border rounded bg-gray-50"
                      >
                        <div>
                          <p className="font-medium">{attachment.filename}</p>
                          <p className="text-sm text-muted-foreground">
                            {attachment.size}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="comments">
            <TabsList>
              <TabsTrigger value="comments" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="comments" className="pt-4">
              <Card>
                <CardContent className="p-4 space-y-4">
                  {comments.length > 0 ? (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-lg ${
                            comment.system
                              ? "bg-muted text-muted-foreground italic"
                              : "border bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="font-medium">
                                {comment.user.name}
                              </div>
                              <span className="text-muted-foreground text-sm ml-2">
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString()} at{" "}
                                {new Date(
                                  comment.created_at
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <p>{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">
                        No comments yet. Be the first to comment.
                      </p>
                    </div>
                  )}

                  <Separator className="my-4" />

                  <form onSubmit={handleSubmitComment}>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                      <Button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                      >
                        {submittingComment ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          "Add Comment"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="pt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">
                          {ticket.created_by?.name} created this ticket
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString()} at{" "}
                          {new Date(ticket.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">
                          Ticket assigned to {ticket.assigned_to?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString()} at{" "}
                          {new Date(ticket.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Status</h3>
                <Select
                  value={statusUpdate}
                  onValueChange={setStatusUpdate}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium">Priority</h3>
                <Select
                  value={priorityUpdate}
                  onValueChange={setPriorityUpdate}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full" 
                onClick={handleUpdateTicket}
                disabled={updatingTicket}
              >
                {updatingTicket ? <LoadingSpinner size="sm" /> : "Update Ticket"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">People</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Created By</h3>
                <div className="flex items-center mt-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {ticket.created_by?.name.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">{ticket.created_by?.name}</p>
                    <p className="text-xs text-muted-foreground">{ticket.created_by?.email}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Assigned To</h3>
                {ticket.assigned_to ? (
                  <div className="flex items-center mt-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {ticket.assigned_to?.name.charAt(0)}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{ticket.assigned_to?.name}</p>
                      <p className="text-xs text-muted-foreground">{ticket.assigned_to?.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    Not assigned
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Created</h3>
                <p className="text-sm mt-1">
                  {new Date(ticket.created_at).toLocaleDateString()} at{" "}
                  {new Date(ticket.created_at).toLocaleTimeString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Last Updated</h3>
                <p className="text-sm mt-1">
                  {new Date(ticket.updated_at).toLocaleDateString()} at{" "}
                  {new Date(ticket.updated_at).toLocaleTimeString()}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Category</h3>
                <p className="text-sm mt-1">{ticket.category || "None"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
