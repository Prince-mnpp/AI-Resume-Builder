import { supabase } from "./supabaseClient";

const CreateResume = async (resume) => {
  const { data, error } = await supabase
    .from("user_resumes")
    .insert([resume])
    .select()
    .single();

  if (error) throw error;
  return data;
};

const GetUserResumes = async (userEmail) => {
  const { data, error } = await supabase
    .from("user_resumes")
    .select("*")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const GetResumeById = async (id) => {
  const { data, error } = await supabase
    .from("user_resumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const UpdateResumeDetail = async (id, updatedFields) => {
  const { data, error } = await supabase
    .from("user_resumes")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const DeleteResumeById = async (id) => {
  const { error } = await supabase
    .from("user_resumes")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};

export default {
  CreateResume,
  GetUserResumes,
  GetResumeById,
  UpdateResumeDetail,
  DeleteResumeById,
};