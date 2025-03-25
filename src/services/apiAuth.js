import supabase from "./supabase";

export async function signUp({ fullName, email, password }) {
    let { data, error } = await supabase.auth.signUp({
        options: { data: { fullName, avatar: "" } },
        email,
        password,
    });
    if (error) {
        throw new Error(error);
    } else {
        return data;
    }
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error);
  } else {
    return data;
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error);
  }
  return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error);
    }
}

export async function updateCurrentUser({ fullName, avatar ,password }) {
    let updateData;
    if (password) {
        updateData = { password };
    }
    if(fullName) updateData = {data:{fullName}};

    const {data, error} = await supabase.auth.updateUser(updateData);
    if (error) {
        throw new Error(error);
    }
    if(!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Date.now()}`;
    const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
    if (storageError) {
        throw new Error(storageError);
    }

    const {data:updatedUser, error:userError} = await supabase.auth.updateUser({data:{avatar:`https://oiawohlmwahybwnbpoxx.supabase.co/storage/v1/object/public/avatars/${fileName}`}});
    if(userError) throw new Error(userError);
    return updatedUser;

}