import { User } from "../models/user.model.js";

export async function addAddreses(req, res) {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
    } = req.body;
    const user = req.user;

    // if this is set as defaults, unset other defaults
    if (isDefault)
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });

    // add new address
    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default function getAddreses(req, res) {
  try {
    const user = req.user;
    res.status(200).json(user.addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateAddreses(req, res) {
  try {
    const { addressId } = req.params;
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const user = req.user;

    // find address to update
    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // if this is set at default, unset other defaults
    if (isDefault)
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });

    // update address fields
    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteAddreses(req, res) {
  try {
    const { addressId } = req.params;
    const user = req.user;

    // find address to delete
    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // remove address
    address.remove();
    await user.save();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function addToWishlist(req, res) {
  try {
    const { productId } = req.params;
    const user = req.user;

    // check if product already in wishlist
    if (user.wishlist.includes(productId))
      return res.status(400).json({ message: "Product already in wishlist" });

    // add product to wishlist
    user.wishlist.push(productId);
    await user.save();
    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getWishlist(req, res) {
  try {
    const user = req.user;
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const { productId } = req.params;
    const user = req.user;

    // check if product in wishlist
    if (!user.wishlist.includes(productId))
      return res.status(400).json({ message: "Product not in wishlist" });

    // remove product from wishlist
    user.wishlist = user.wishlist.filter((id) => id !== productId);
    await user.save();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
