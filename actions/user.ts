"use server"
import {db} from '../lib/db'


interface ClerkUser {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_address: string;
  username?: string | null;
}

export const createUser = async (user:ClerkUser) => {
  const { id, first_name, last_name, email_address,  username } =
    user;
  try {
    const userExists = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (userExists) {
      updateUser(user);
      return;
    }
    await db.user.create({
      data: {
        id,
        first_name,
        last_name,
        email_address,
        username,
      },
    });
    console.log("New user created in db");
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to save new user in db",
    };
  }

  console.log("User created in supabase");
};

export const updateUser = async (user:ClerkUser) => {
  const { id, first_name, last_name, email_address, username } =
    user;
  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        first_name,
        last_name,
        email_address,
        
        username,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to update user in db",
    };
  }

  console.log("User updated in supabase");
};

export const getUser = async (id:string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email_address: true,
        username: true,
        
      },
    });
    return { data: user };
  } catch (e) {
    throw e;
  }
};

export const deleteUser = async (id:string) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to delete user in db",
    };
  }

  console.log("User deleted in supabase");
};

