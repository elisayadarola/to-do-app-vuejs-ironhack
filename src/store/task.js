import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";
// <!--exporto useTaskStore para re-utilizarlo en otros lados y no tener que repetirme-->
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      try {
        const { data: tasks, error } = await supabase
          .from("tasks")
          .select("*")
          .order("is_complete", { ascending: true });
        if (error) throw error;
        this.tasks = tasks;
        return this.tasks;
      } catch (error) {
        console.log(error);
      }
    },
    async insertTasks(name) {
      // console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: name,
          is_complete: false,
        },
      ]);
    },
    async editTask(name, id) {
      console.log(name, id);
      try {
        const { data, error } = await supabase
          .from("tasks")
          .update({ title: name })
          .match({ id: id });
        if (error) throw error;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },
    async isCompleted(id, status) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: status })
        .match({ id: id });
      if (error) throw error;
    },
  },
});
/*HE AGREGADO 4 TAREAS BASICAS, ADD - REMOVE - EDIT Y MARK_COMPLETED */
