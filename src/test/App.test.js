import { _saveQuestion } from "../utils/_DATA"; // Adjust the import based on your file structure

describe("_saveQuestion", () => {
  it("should return the saved question with all expected fields populated", async () => {
    // Arrange: Create a correctly formatted question object
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "user1",
    };

    // Act: Call the _saveQuestion function with the question object
    const savedQuestion = await _saveQuestion(question);

    // Assert: Check that the returned question has all expected fields
    expect(savedQuestion).toHaveProperty("id"); // Check if 'id' is present
    expect(savedQuestion).toHaveProperty("timestamp"); // Check if 'timestamp' is present
    expect(savedQuestion).toHaveProperty("optionOne"); // Check if 'optionOne' is present
    expect(savedQuestion).toHaveProperty("optionTwo"); // Check if 'optionTwo' is present
    expect(savedQuestion.optionOne.text).toBe(question.optionOneText); // Check the text of option one
    expect(savedQuestion.optionTwo.text).toBe(question.optionTwoText); // Check the text of option two
    expect(savedQuestion.author).toBe(question.author); // Check the author
  });

  it("should return an error if incorrect data is passed", async () => {
    // Arrange
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "",
      author: "",
    };

    // Action & Assert
    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if optionOneText is missing", async () => {
    const invalidQuestion = {
      optionTwoText: "Option Two",
      author: "author123",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if optionTwoText is missing", async () => {
    const invalidQuestion = {
      optionOneText: "Option One",
      author: "author123",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if author is missing", async () => {
    const invalidQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if optionOneText is an empty string", async () => {
    const invalidQuestion = {
      optionOneText: "",
      optionTwoText: "Option Two",
      author: "author123",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if optionTwoText is an empty string", async () => {
    const invalidQuestion = {
      optionOneText: "Option One",
      optionTwoText: "",
      author: "author123",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should return an error if author is an empty string", async () => {
    const invalidQuestion = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "",
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("should save the question if long strings are passed", async () => {
    const validQuestion = {
      optionOneText: "A".repeat(1000),
      optionTwoText: "B".repeat(1000),
      author: "author123",
    };

    const result = await _saveQuestion(validQuestion);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("timestamp");
    expect(result.optionOne.text).toBe(validQuestion.optionOneText);
    expect(result.optionTwo.text).toBe(validQuestion.optionTwoText);
    expect(result.author).toBe(validQuestion.author);
  });
});
