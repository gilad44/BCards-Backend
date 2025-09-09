const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const { url, alt } = rawCard.image || {};
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: alt || "Business card image",
  };

  return {
    title: rawCard.title,
    subtitle: rawCard.subtitle,
    description: rawCard.description,
    phone: rawCard.phone,
    email: rawCard.email,
    web: rawCard.web,
    image,
    address: {
      ...rawCard.address,
      state: rawCard.address?.state || "",
      zip: Number(rawCard.address.zip) || 0,
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
    likes: rawCard.likes || [],
  };
};

module.exports = normalizeCard;
