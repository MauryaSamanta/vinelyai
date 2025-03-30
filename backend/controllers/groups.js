import Group from "../models/Groups.js"
import User from "../models/User.js";

export const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID is required" });
   // console.log(req.body);
   const groups = await Group.find({ members: userId })
   .populate("members", "firstName lastName avatar"); // Populate members

    //console.log(groups);
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// ✅ Create a Group
export const createGroup = async (req, res) => {
  try {
    const { name,  createdBy } = req.body;
    //console.log(req.body);
    if (!name || !createdBy) {
      return res.status(400).json({ message: "Group name and creator are required." });
    }

    const newGroup = new Group({
      name,
     
      createdBy,
    
      members: [createdBy], // The creator is automatically added as a member
    });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
};

// ✅ Change Group Name
export const changeGroupName = async (req, res) => {
  try {
    const { groupId, newName } = req.body;

    if (!newName) {
      return res.status(400).json({ message: "New group name is required." });
    }

    const updatedGroup = await Group.findByIdAndUpdate(groupId, { name: newName }, { new: true });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: "Error updating group name", error });
  }
};

// ✅ Change Group Description
export const changeGroupDescription = async (req, res) => {
  try {
    const { groupId, newDescription } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(groupId, { description: newDescription }, { new: true });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found." });
    }

    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: "Error updating group description", error });
  }
};

// ✅ Add Member to Group
export const addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found." });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

   
    // Ensure userId is not already in group.members
    if (group.members.some(member => member.toString() === userId.toString())) {
      return res.status(400).json({ message: "User is already in the group." });
    }


    group.members.push(userId);
    await group.save();
    const groups = await Group.find({ members: userId })
    .populate("members", "firstName lastName avatar"); // Populate members

    res.json( groups );
  } catch (error) {
    res.status(500).json({ message: "Error adding user to group", error });
  }
};

// ✅ Remove Member from Group
export const removeMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found." });

    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: "User is not in the group." });
    }

    group.members = group.members.filter(member => member.toString() !== userId);
    await group.save();

    res.json({ message: "User removed from group", group });
  } catch (error) {
    res.status(500).json({ message: "Error removing user from group", error });
  }
};
