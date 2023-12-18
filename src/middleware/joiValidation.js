/** @format */

const Joi = require("@hapi/joi");

const issueIdSchema = Joi.object({
  issue_id: Joi.number().required(),
});

const updatedDetailsSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
});

module.exports = {
  issueIdSchema,
  updatedDetailsSchema,
};
