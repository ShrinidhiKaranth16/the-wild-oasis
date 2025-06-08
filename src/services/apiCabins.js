import supabase from "./supabase";

export async function getCabin(id) {
  let { data: cabins, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be loaded");
  }
  console.log("cabins", cabins);
  if (!cabins) return 0;  
  return cabins[0];
}
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.("https://");
  console.log(newCabin, id);
  //https://oiawohlmwahybwnbpoxx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `cabin-${Date.now()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const supabaseUrl = "https://oiawohlmwahybwnbpoxx.supabase.co";

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  if (id) return data;
  console.log("newCabin.image", newCabin.image);
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return data;
}
