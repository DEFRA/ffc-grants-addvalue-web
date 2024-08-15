const { getAnswersKeys } = require('ffc-grants-common-functionality/lib/utils');
const { Map, Set } = require('immutable');

describe("Get & Post Handlers", () => {
  jest.mock("ffc-grants-common-functionality", () => {
    const original = jest.requireActual("ffc-grants-common-functionality");
    return {
      ...original,
      session: {
        getYarValue: jest.fn(),
      },
      errorHelpers: {
        checkInputError: jest.fn(),
      },
      utils: {
        getAnswersKeys: jest.fn(),
        getQuestionByKey: jest.fn(),
      },
    };
  });
  const {
    session,
    errorHelpers,
    utils,
  } = require("ffc-grants-common-functionality");

  jest.mock("../../../../app/helpers/conditionalHTML");
  const { getHtml } = require("../../../../app/helpers/conditionalHTML");

  jest.mock("../../../../app/helpers/models");
  const { getModel } = require("../../../../app/helpers/models");

  const {
    customiseErrorText,
    checkErrors,
  } = require("../../../../app/helpers/errorSummaryHandlers");

  let mockH;

  describe("customiseErrorText()", () => {
    beforeEach(() => {
      mockH = { view: jest.fn() };
      session.getYarValue.mockReturnValue("mock-yar-value");
      getHtml.mockReturnValue("mock-html");
      getModel.mockReturnValue({ items: ["item1", "item2"] });
    });

    test("customiseErrorText()", () => {
      let currentQuestion = {
        yarKey: "mock-yarKey",
        type: "multi-input",
        conditionalKey: "mock-condKey",
      };
      let errorList = [{ href: "mock-yarKey", text: "mock-href-text" }];
      customiseErrorText("mock-value", currentQuestion, errorList, mockH, {});
      expect(mockH.view).toHaveBeenCalledWith("page", {
        items: ["item1", "item2"],
        errorList: [
          {
            href: "mock-yarKey",
            text: "mock-href-text",
          },
        ],
      });

      getModel.mockReturnValue({ items: { item1: "item1", item2: "item2" } });
      currentQuestion = {
        ...currentQuestion,
        type: "mock-type",
      };
      mockH.view.mockClear();
      customiseErrorText("mock-value", currentQuestion, errorList, mockH, {});
      expect(mockH.view).toHaveBeenCalledWith("page", {
        items: {
          item1: "item1",
          item2: "item2",
          errorMessage: { text: "mock-href-text" },
        },
        errorList: [
          {
            href: "mock-yarKey",
            text: "mock-href-text",
          },
        ],
      });

      getModel.mockReturnValue({ items: { item1: "item1", item2: "item2" } });
      errorList = [
        { href: "mock-another-yarKey", text: "mock-another-href-text" },
      ];
      mockH.view.mockClear();
      customiseErrorText("mock-value", currentQuestion, errorList, mockH, {});
      expect(mockH.view).toHaveBeenCalledWith("page", {
        items: { item1: "item1", item2: "item2" },
        errorList: [
          {
            href: "mock-another-yarKey",
            text: "mock-another-href-text",
          },
        ],
      });
    });

    describe("checkErrors()  - COMBINATION_ANSWER", () => {

      const mockInputError = {
        type: "COMBINATION_ANSWER",
        error: "",
        combinationErrorsMap: Map([
          [Set(['project-impact-A1', 'project-impact-A2']), "Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"],
          [Set(['project-impact-A1', 'project-impact-A3']), "Select either 'Starting to make added-value products for the first time' or 'Increasing range'"],
          [Set(['project-impact-A1', 'project-impact-A2', 'project-impact-A3']), "Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"],
          [Set(['project-impact-A1', 'project-impact-A2', 'project-impact-A4']), "Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"],
          [Set(['project-impact-A1', 'project-impact-A3', 'project-impact-A4']), "Select either 'Starting to make added-value products for the first time' or 'Increasing range'"],
          [Set(['project-impact-A1', 'project-impact-A2', 'project-impact-A3', 'project-impact-A4']), "Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"],
        ]),
        combinationObject: {
          questionKey: "project-impact",
          combinationAnswerKeys: ["project-impact-A1", "project-impact-A4"],
        },
      }

      let currentQuestion = {
        type: "sup",
        validate: [
          {
            type: "NOT_EMPTY",
            error: "Select what impact this project will have",
          },
          mockInputError
        ],
        answers: [
          {
            key: 'project-impact-A3',
            value: "Increasing range of added-value products",
          },
          {
            key: 'project-impact-A2',
            value: "Increasing volume of added-value products",
          },
          {
            key: 'project-impact-A4',
            value: "Allow selling direct to consumer",
            hint: {
              text: "For example, retail and internet sales",
            },
          },
          {
            key: 'project-impact-A1',
            value: "Starting to make added-value products for the first time",
            hint: {
              text: "This only applies if you do not currently make added-value products",
            },
          },
        ],
        yarKey: "projectImpact",
      };

      beforeEach(() => {
        errorHelpers.checkInputError.mockReturnValue(mockInputError);
        utils.getQuestionByKey
          .mockReturnValue(
            currentQuestion
          )
      });

      test.each`
        projectImpactUserInput                                                                                                                                                                         | expectedErrorText
        ${["Increasing volume of added-value products", "Starting to make added-value products for the first time"]}                                                                                   | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"}
        ${["Increasing volume of added-value products", "Starting to make added-value products for the first time", "Starting to make added-value products for the first time"]}                       | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing volume'"}
        ${["Starting to make added-value products for the first time", "Increasing range of added-value products"]}                                                                                    | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing range'"}
        ${[ "Allow selling direct to consumer", "Starting to make added-value products for the first time", "Increasing range of added-value products"]}                                               | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing range'"}
        ${[ "Starting to make added-value products for the first time", "Increasing volume of added-value products", "Increasing range of added-value products", "Allow selling direct to consumer"]}  | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"}
        ${[ "Starting to make added-value products for the first time", "Increasing volume of added-value products", "Increasing range of added-value products"]}                                      | ${"Select either 'Starting to make added-value products for the first time' or 'Increasing volume' and 'Increasing range'"}
      `('returns $expectedErrorText when $projectImpactUserInput is entered', ({projectImpactUserInput, expectedErrorText}) => {
        let payload = {
          projectImpact: projectImpactUserInput,
        };
        utils.getAnswersKeys.mockReturnValueOnce(projectImpactUserInput.map(userInput => currentQuestion.answers.find(answer => answer.value === userInput).key));

        checkErrors(payload, currentQuestion, mockH, {});

        expect(mockH.view).toHaveBeenCalledWith("page", {
          errorList: [
            {
              href: "#projectImpact",
              text: expectedErrorText,
            },
          ],
          items: {
            0: "item1",
            1: "item2",
            errorMessage: {
              text: expectedErrorText,
            },
          },
        });
      });
    });
  });
});
