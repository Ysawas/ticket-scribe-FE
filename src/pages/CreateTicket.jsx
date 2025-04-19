
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { createTicket } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, this would be:
      // const formDataWithFiles = new FormData();
      // Object.keys(formData).forEach(key => {
      //   formDataWithFiles.append(key, formData[key]);
      // });
      // attachments.forEach(file => {
      //   formDataWithFiles.append('attachments', file);
      // });
      // const response = await createTicket(formDataWithFiles);

      // Mock successful ticket creation
      toast.success("Ticket created successfully");
      navigate("/tickets"); // Redirect to ticket list
    } catch (error) {
      toast.error("Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create New Ticket</h1>
        <p className="text-muted-foreground">
          Fill in the details to create a new support ticket
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Information</CardTitle>
            <CardDescription>
              Provide information about the issue you're experiencing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief summary of the issue"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the issue"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleSelectChange("priority", value)}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <div className="border rounded-md p-2">
                <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md border-gray-300 cursor-pointer">
                  <input
                    id="attachments"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="attachments" className="cursor-pointer text-center p-4 w-full">
                    <div className="text-muted-foreground">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, PDF, DOC up to 10MB
                    </div>
                  </label>
                </div>
                
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-medium">Uploaded files:</div>
                    <ul className="space-y-2">
                      {attachments.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between border rounded p-2 text-sm bg-gray-50"
                        >
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/tickets")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner size="sm" /> : "Create Ticket"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateTicket;
