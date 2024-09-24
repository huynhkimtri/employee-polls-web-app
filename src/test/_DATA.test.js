import { _saveQuestion } from '../utils/_DATA'; // Adjust the import based on your file structure

describe('_saveQuestion', () => {
  it('should return the saved question with all expected fields populated', async () => {
    // Arrange: Create a correctly formatted question object
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'user1',
    };

    // Act: Call the _saveQuestion function with the question object
    const savedQuestion = await _saveQuestion(question);

    // Assert: Check that the returned question has all expected fields
    expect(savedQuestion).toHaveProperty('id'); // Check if 'id' is present
    expect(savedQuestion).toHaveProperty('timestamp'); // Check if 'timestamp' is present
    expect(savedQuestion).toHaveProperty('optionOne'); // Check if 'optionOne' is present
    expect(savedQuestion).toHaveProperty('optionTwo'); // Check if 'optionTwo' is present
    expect(savedQuestion.optionOne.text).toBe('Option One'); // Check the text of option one
    expect(savedQuestion.optionTwo.text).toBe('Option Two'); // Check the text of option two
    expect(savedQuestion.author).toBe('user1'); // Check the author
  });
});