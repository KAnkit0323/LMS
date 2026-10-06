import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const categories = [
  { label: "DSA", value: "DSA" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "System Design", value: "System Design" },
  { label: "React", value: "React" },
  { label: "Nodejs", value: "Nodejs" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "SQL", value: "SQL" },
  { label: "DBMS", value: "DBMS" },
  { label: "Operating System", value: "Operating System" },
  { label: "C++", value: "C++" },
  { label: "Java", value: "Java" },
  { label: "OOPS", value: "OOPS" },
]

const AddCourse = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");

    // mutation hai isliye []
    const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();
    
    const getSelectedCategory = (value) => {
        setCategory(value);
    }
    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
        navigate(-1); 
    };

    // for displaying toast
    useEffect(() => {
        if(isSuccess) {
            toast.success(data?.message || "Course Created");
        }
    }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add course, add some basic course details for your new course
        </h1>
        <p className="text-sm">
          make the course that change the mentality of student
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            placeholder="Your course name"
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select categories={categories}
            onValueChange={getSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2" >
            <Button variant="outline"
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
            <Button disabled={isLoading} onClick={createCourseHandler} >
                {
                    isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait...
                        </>
                    ) : "Create"
                }
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

