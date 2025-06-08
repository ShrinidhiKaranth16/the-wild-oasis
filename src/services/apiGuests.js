import supabase from "./supabase";

export async function createGuest(newGuest) {
  console.log("Creating guest", newGuest);
  const { data, error } = await supabase.from("guests").insert(newGuest).select("*");
  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  console.log(data);
  return data;
}

export async function getGuests() {
  let { data, error } = await supabase.from("guests").select("*");
  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }
  return data;
}
