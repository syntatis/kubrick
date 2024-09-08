import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useProps } from './useProps';

describe('rootProps', () => {
	describe('id', () => {
		it('should return "id"', () => {
			const { result } = renderHook(() =>
				useProps('ComponentName', { id: 'test-id-1' })
			);

			expect(result.current.rootProps()).toHaveProperty(
				'id',
				'test-id-1-ComponentName-root'
			);

			expect(result.current.componentProps).toHaveProperty('id', 'test-id-1');
		});

		it('should return "id" as undefined', () => {
			const { result } = renderHook(() => useProps('ComponentName'));

			expect(result.current.rootProps()).toHaveProperty('id', undefined);
		});
	});

	describe('style', () => {
		it('should return "style"', () => {
			const { result } = renderHook(() =>
				useProps('ComponentName', { style: { color: 'red' } })
			);

			expect(result.current.rootProps()).toHaveProperty('style', {
				color: 'red',
			});
		});

		it('should return "style" as undefined', () => {
			const { result } = renderHook(() => useProps('ComponentName'));

			expect(result.current.rootProps()).toHaveProperty('style', undefined);
		});
	});

	describe('className', () => {
		it('should return "className"', () => {
			const { result } = renderHook(() =>
				useProps('ComponentName', { className: 'test-class-1' })
			);

			expect(result.current.rootProps()).toHaveProperty(
				'className',
				'kubrick-ComponentName-root test-class-1'
			);
		});

		it('should return "className" as undefined', () => {
			const { result } = renderHook(() => useProps('ComponentName'));

			expect(result.current.rootProps()).toHaveProperty(
				'className',
				'kubrick-ComponentName-root'
			);
		});

		it('should override prefixed name', () => {
			const { result } = renderHook(() => useProps('ComponentName'));

			expect(
				result.current.rootProps({
					prefixedNames: 'foo-bar',
				})
			).toHaveProperty('className', 'kubrick-ComponentName-foo-bar');
		});
	});

	describe('data-testid', () => {
		it('should return "data-testid"', () => {
			const { result } = renderHook(() =>
				useProps('ComponentName', { 'data-testid': 'test-id-1' })
			);

			expect(result.current.rootProps()).toHaveProperty(
				'data-testid',
				'test-id-1'
			);
		});

		it('should return "data-testid" as undefined', () => {
			const { result } = renderHook(() => useProps('ComponentName'));

			expect(result.current.rootProps()).toHaveProperty(
				'data-testid',
				undefined
			);
		});

		it('should return "id"', () => {
			const { result } = renderHook(() =>
				useProps('ComponentName', {
					id: 'unique-1',
				})
			);

			expect(result.current.rootProps()).toHaveProperty(
				'id',
				'unique-1-ComponentName-root'
			);
			expect(result.current.componentProps).toHaveProperty('id', 'unique-1');
		});
	});
});

describe('componentProps', () => {
	it('should return "aria-*" properly', () => {
		const { result } = renderHook(() =>
			useProps('ComponentName', { 'aria-label': 'name' })
		);

		expect(result.current.componentProps).toHaveProperty('aria-label', 'name');
		expect(result.current.rootProps()).not.toHaveProperty('aria-label'); // Make sure it's not duplicated in root.
	});

	it('should return "data-*" properly', () => {
		const { result } = renderHook(() =>
			useProps('ComponentName', { 'data-foo': 'bar' })
		);

		expect(result.current.componentProps).toHaveProperty('data-foo', 'bar');
		expect(result.current.rootProps()).not.toHaveProperty('data-foo'); // Make sure it's not duplicated in root.
	});

	it('should not return "data-testid"', () => {
		const { result } = renderHook(() =>
			useProps('ComponentName', { 'data-testid': 'test-id-1' })
		);

		expect(result.current.componentProps).not.toHaveProperty('data-testid');
	});
});
