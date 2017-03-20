import {getSubClassDetails} from './index.js'

test('processes subclassof properly', () => {
  // [{"Class":[{"$":{"abbreviatedIRI":"story:animal"}}],"ObjectUnionOf":[{"Class":[{"$":{"abbreviatedIRI":"story:cat"}},{"$":{"abbreviatedIRI":"story:goat"}}]}]},{"Class":[{"$":{"abbreviatedIRI":"story:human"}}],"ObjectIntersectionOf":[{"Class":[{"$":{"abbreviatedIRI":"story:person"}}],"ObjectSomeValuesFrom":[{"ObjectProperty":[{"$":{"abbreviatedIRI":"story:own"}}],"Class":[{"$":{"abbreviatedIRI":"story:automobile"}}]}]}]},{"Class":[{"$":{"abbreviatedIRI":"story:human"}}],"ObjectOneOf":[{"NamedIndividual":[{"$":{"abbreviatedIRI":"story:John"}},{"$":{"abbreviatedIRI":"story:Mary"}}]}]},{"Class":[{"$":{"abbreviatedIRI":"story:man"}},{"$":{"abbreviatedIRI":"story:person"}}]},{"ObjectUnionOf":[{"Class":[{"$":{"abbreviatedIRI":"story:apple"}},{"$":{"abbreviatedIRI":"story:leaf"}}]}],"Class":[{"$":{"abbreviatedIRI":"story:food"}}]}]
  // expect(getSubClassDetails()).toBe(3);
});
