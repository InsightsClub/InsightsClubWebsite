const mongoose = require("mongoose");

const { Schema } = mongoose;

const contentSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
		},

		description: {
			type: String,
			require: true,
		},

		tags: {
			type: [String],
			require: true,
		},

		content: {
			type: String,
			require: true,
		},

		author: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			require: true,
		},
		likes: {
			type: Number,
			default: 0,
			require: true,
		},

		likedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "Users",
			},
		],

		isReviewed: {
			type: Boolean,
			require: true,
			default: false,
		},

		reviewedBy: {
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	},
	{ timestamps: true }
);

const Content = mongoose.model("content", contentSchema);
module.exports = Content;
