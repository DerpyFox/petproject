import { Op } from "sequelize";
import Tutorial from "../models/tutorial.model.js";

interface ITutorialRepository {
  save(tutorial: Tutorial): Promise<Tutorial>;
  retrieveAll(searchParams: IRetrieveParams): Promise<Tutorial[]>;
  retrieveById(tutorialId: number): Promise<Tutorial | null>;
  update(tutorial: Tutorial): Promise<number>;
  delete(tutorialId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface IRetrieveParams {
  username?: string;
  role?: "user" | "admin";
}

type SearchCondition = Record<string, unknown>;

class TutorialRepository implements ITutorialRepository {
  async save(tutorial: Tutorial): Promise<Tutorial> {
    try {
      return await Tutorial.create({
        username: tutorial.username,
        email: tutorial.email,
        password_hash: tutorial.password_hash,
        role: tutorial.role ?? "user"
      });
    } catch (err: unknown) {
      console.error(err);
      throw new Error("Failed to create Tutorial!");
    }
  }

  async retrieveAll(searchParams: IRetrieveParams): Promise<Tutorial[]> {
    try {
      const condition: SearchCondition = {};

      if (searchParams?.role) {
        condition.role = searchParams.role;
      }
      if (searchParams?.username) {
        condition.username = { [Op.iLike]: `%${searchParams.username}%` };
      }

      const rows = await Tutorial.findAll({ where: condition });
      return rows as Tutorial[];

    } catch (error: unknown) {
      console.error(error);
      throw new Error("Failed to retrieve Tutorials!");
    }
  }

  async retrieveById(tutorialId: number): Promise<Tutorial | null> {
    try {
      return await Tutorial.findByPk(tutorialId);
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Failed to retrieve Tutorials!");
    }
  }

  async update(tutorial: Tutorial): Promise<number> {
    const { id, username, email, password_hash, role } = tutorial;

    if (typeof id !== "number") {
      throw new Error("Tutorial id is required for update");
    }
    
    try {
      const affectedRows = await Tutorial.update(
        { username, email, password_hash, role },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Failed to update Tutorial!");
    }
  }

  async delete(tutorialId: number): Promise<number> {
    try {
      const affectedRows = await Tutorial.destroy({ where: { id: tutorialId } });

      return affectedRows;
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Failed to delete Tutorial!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Tutorial.destroy({
        where: {},
        truncate: false
      });
    } catch (error: unknown) {
      console.error(error);
      throw new Error("Failed to delete Tutorials!");
    }
  }
}

export default new TutorialRepository();