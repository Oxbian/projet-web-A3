#!/usr/bin/python3
###
# \\Author: Thibault Napoléon "Imothep"
# \\Company: ISEN Yncréa Ouest
# \\Email: thibault.napoleon@isen-ouest.yncrea.fr
# \\Created Date: 03-Jun-2023 - 00:06:02
# \\Last Modified: 07-Jun-2023 - 17:00:08
###

"""Predict accident cluster."""

# Imports.
import argparse
import random


def checkArguments():
    """Check program arguments and return program parameters."""
    parser = argparse.ArgumentParser()
    parser.add_argument('-lat', '--latitude', type=float, required=True,
                        help='latitude')
    parser.add_argument('-lon', '--longitude', type=float, required=True,
                        help='longitude')
    return parser.parse_args()


# Main program.
args = checkArguments()
print(random.randint(1, 5))
