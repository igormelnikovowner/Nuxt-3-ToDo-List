import { z } from "zod";
import type { ICredentials } from "~/interfaces/auth";

export default function useAuthValidator({ email, password, name }: ICredentials, type: string) {
  let body;
  try {
    if (type === "signin") {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
      });
      body = loginSchema.parse({ email, password });
    } else if (type === "signup") {
      const signUpSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(3),
      });
      body = signUpSchema.parse({ email, password, name });
    }
    return {
      flag: true,
      ...body,
    };
  } catch (err) {
    let errors = {
      flag: false,
    };

    if (err instanceof z.ZodError) {
      const zodIssues = err.issues;

      for (let i = 0; i < zodIssues.length; i += 1) {
        errors[zodIssues[i].path[0]] = zodIssues[i].message;
      }
    }
    return errors;
  };
};
