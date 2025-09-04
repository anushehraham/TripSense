import Packlist from '../models/Packlist.js';

// Create or update packlist for a user
export const savePacklist = async (req, res) => {
  try {
    const { userId, items, title } = req.body;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items array is required'
      });
    }

    // Find existing packlist for user or create new one
    let packlist = await Packlist.findOne({ userId });
    
    if (packlist) {
      // Update existing packlist
      packlist.items = items;
      packlist.title = title || packlist.title;
      packlist.updatedAt = new Date();
    } else {
      // Create new packlist
      packlist = new Packlist({
        userId,
        items,
        title: title || 'My Packing List'
      });
    }

    const savedPacklist = await packlist.save();

    res.status(200).json({
      success: true,
      message: 'Packlist saved successfully',
      data: savedPacklist
    });

  } catch (error) {
    console.error('Save packlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while saving packlist',
      error: error.message
    });
  }
};

// Get packlist for a user
export const getPacklist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const packlist = await Packlist.findOne({ userId });

    if (!packlist) {
      return res.status(404).json({
        success: false,
        message: 'No packlist found for this user'
      });
    }

    res.status(200).json({
      success: true,
      data: packlist
    });

  } catch (error) {
    console.error('Get packlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching packlist',
      error: error.message
    });
  }
};

// Add item to packlist
export const addItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, category, quantity } = req.body;

    if (!userId || !name) {
      return res.status(400).json({
        success: false,
        message: 'User ID and item name are required'
      });
    }

    let packlist = await Packlist.findOne({ userId });

    if (!packlist) {
      // Create new packlist if it doesn't exist
      packlist = new Packlist({
        userId,
        items: [],
        title: 'My Packing List'
      });
    }

    // Add new item
    const newItem = {
      name: name.trim(),
      category: category || 'General',
      quantity: quantity || 1,
      packed: false
    };

    packlist.items.push(newItem);
    const savedPacklist = await packlist.save();

    res.status(200).json({
      success: true,
      message: 'Item added successfully',
      data: savedPacklist
    });

  } catch (error) {
    console.error('Add item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while adding item',
      error: error.message
    });
  }
};

// Update item in packlist
export const updateItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { name, category, quantity, packed } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and item ID are required'
      });
    }

    const packlist = await Packlist.findOne({ userId });

    if (!packlist) {
      return res.status(404).json({
        success: false,
        message: 'Packlist not found'
      });
    }

    const item = packlist.items.id(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Update item fields
    if (name !== undefined) item.name = name.trim();
    if (category !== undefined) item.category = category;
    if (quantity !== undefined) item.quantity = quantity;
    if (packed !== undefined) item.packed = packed;

    const savedPacklist = await packlist.save();

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: savedPacklist
    });

  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating item',
      error: error.message
    });
  }
};

// Delete item from packlist
export const deleteItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: 'User ID and item ID are required'
      });
    }

    const packlist = await Packlist.findOne({ userId });

    if (!packlist) {
      return res.status(404).json({
        success: false,
        message: 'Packlist not found'
      });
    }

    packlist.items.pull(itemId);
    const savedPacklist = await packlist.save();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: savedPacklist
    });

  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting item',
      error: error.message
    });
  }
};

// Delete entire packlist
export const deletePacklist = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const result = await Packlist.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Packlist not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Packlist deleted successfully'
    });

  } catch (error) {
    console.error('Delete packlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting packlist',
      error: error.message
    });
  }
};
