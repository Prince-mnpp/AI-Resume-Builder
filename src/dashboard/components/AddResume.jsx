import { Loader2, PlusSquare } from "lucide-react";
import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';

import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [openDialog , setOpenDialog] = useState(false);
  const [resumeTitle , setResumeTitle] = useState();
  const {user} = useUser();
  const [loading,setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
  try {
    setLoading(true);

    const resume = await GlobalApi.CreateResume({
      title: resumeTitle,
      resume_id: uuidv4(),
      user_email: user?.primaryEmailAddress?.emailAddress,
      user_name: user?.fullName,
      theme_color: "#7c3aed",
    });

    setLoading(false);
    setOpenDialog(false);
    navigation(`/dashboard/resume/${resume.id}/edit`);
  } catch (error) {
    console.log("Create resume error:", error);
    setLoading(false);
  }
};
  return (
    <div>
      <div className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-70 hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
      onClick={() => setOpenDialog(true)}>
        <PlusSquare />

      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <Input className="mt-2 my-2" placeholder="Ex.Full Stack Developer Resume"
              onChange={(e) => setResumeTitle(e.target.value)}/>
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button disabled={!resumeTitle || loading} onClick={() => onCreate()}>
                {loading?
                <Loader2 className="animate-spin"/> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
