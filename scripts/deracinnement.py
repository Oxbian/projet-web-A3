#!/usr/bin/python3
###
# \\Author: Thibault Napoléon "Imothep"
# \\Company: ISEN Yncréa Ouest
# \\Email: thibault.napoleon@isen-ouest.yncrea.fr
# \\Created Date: 02-Jun-2023 - 23:23:21
# \\Last Modified: 12-Jun-2024 - 22:01:14
###

"""Predict tree uprooting."""

# Imports.
import argparse


def checkArguments():
    """Check program arguments and return program parameters."""
    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--model', type=str, required=True, help='model')
    return parser.parse_args()


# Main program.
args = checkArguments()
if args.model == 'knn':
    print('true')
if args.model == 'svm':
    print('true')
if args.model == 'rf':
    print('false')
if args.model == 'mlp':
    print('true')
