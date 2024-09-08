import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { parsePrefixedNames, useClasses } from './useClasses';

describe('parsePrefixedNames', () => {
	it('should return parse classes to be prefixed', () => {
		expect(parsePrefixedNames('test foo bar')).toEqual(['test', 'foo', 'bar']);

		expect(parsePrefixedNames(['test', 'foo', 'bar'])).toEqual([
			'test',
			'foo',
			'bar',
		]);

		expect(parsePrefixedNames(['test', 'foo', 'bar 123'])).toEqual([
			'test',
			'foo',
			'bar',
			'123',
		]);
	});
});

describe('useClasses', async () => {
	const { result } = renderHook(() => useClasses('ComponentName'));

	it('should return class with prefix', () => {
		expect(
			result.current.clsx({
				prefixedNames: 'test',
			})
		).toEqual('kubrick-ComponentName-test');
	});

	it('should return class with prefix and the rest of class names', () => {
		expect(
			result.current.clsx({
				classNames: ['foo', { bar: true }, { abc: false }],
				prefixedNames: ['123 456', '789'],
			})
		).toEqual(
			'kubrick-ComponentName-123 kubrick-ComponentName-456 kubrick-ComponentName-789 foo bar'
		);
	});

	it('should not return class with prefix', () => {
		expect(
			result.current.clsx({
				classNames: 'only-class',
			})
		).toEqual('only-class');
	});

	it('should return undefined', () => {
		expect(
			result.current.clsx({
				classNames: '',
			})
		).toBeUndefined();
	});
});
