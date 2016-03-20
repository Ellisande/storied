Scenario: Hug a puppy
Meta:
@tag goofy
@auth Ellisande
Given a user
And a puppy
When I log in
And pet the puppy
Then I should be logged in
And the puppy should be happy
