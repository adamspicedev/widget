import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import tailwindStyles from "../index.css?inline";
import supabase from "../supabase-client";
import { cn } from "@/lib/utils";

export const Widget = ({ projectId, position = "bottom-right" }) => {
  const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const onSelectStar = (index) => {
    setRating(index + 1);
  };

  const submit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      p_message: form.feedback.value,
      p_project_id: projectId,
      p_rating: rating,
      p_user_email: form.email.value,
      p_user_name: form.name.value,
    };

    const { data: returnedData, error } = await supabase.rpc(
      "add_feedback",
      data
    );
    setSubmitted(true);
    if (error) console.error(error);
  };

  const positionParts = positions.includes(position)
    ? position.split("-")
    : "bottom-right".split("-");

  return (
    <>
      <style>{tailwindStyles}</style>
      <div
        className={cn(
          "fixed z-50 widget",
          positionParts[1] === "right" && "right-4",
          positionParts[1] === "left" && "left-4",
          positionParts[0] === "top" && "top-4",
          positionParts[0] === "bottom" && "bottom-4"
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex flex-row justify-between rounded-full shadow-lg hover:scale-105">
              <MessageCircleIcon className="w-5 h-5" />
              <span className="ml-1">Feedback</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              "w-full max-w-md p-4 mr-4 rounded-lg shadow-lg widget bg-card",
              positionParts[1] === "right" && "mr-4",
              positionParts[1] === "left" && "ml-4"
            )}
          >
            <style>{tailwindStyles}</style>
            {submitted ? (
              <div>
                <h3 className="text-lg font-bold">
                  Thank you for your feedback!
                </h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us improve our product
                  and provide better service to our customers.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">Send us your feedback</h3>
                <form className="space-y-2" onSubmit={submit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Tell us what you think"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, index) => (
                        <StarIcon
                          key={index}
                          className={`h-5 w-5 cursor-pointer ${
                            rating > index
                              ? "fill-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                          onClick={() => onSelectStar(index)}
                        />
                      ))}
                    </div>
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
                <div className="flex justify-center w-full">
                  <a className="mx-auto text-xs cursor-pointer " href="#">
                    powered by fdBK
                  </a>
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-message-circle"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
